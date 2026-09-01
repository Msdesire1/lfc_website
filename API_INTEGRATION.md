# Connecting the dashboard to the API

This document explains how to wire the pages under `app/dashboard/` to the Express
API in `backend/`. It is written for the person doing that wiring.

**No existing file in this app has been modified.** Three files were added and
nothing else: this guide, `lib/api.js`, and `.env.local.example`. Every component,
page and stylesheet is exactly as it was, so you can adopt the API one panel at a
time and stop whenever you like.

## The short version

Start MongoDB, then in `backend/`:

```bash
cp .env.example .env      # fill in MONGODB_URI, JWT_SECRET, ADMIN_JWT_SECRET
npm run seed              # three courses, their lessons, and the first admin
npm run dev               # http://localhost:5000
```

Then in this app:

```bash
cp .env.local.example .env.local
npm run dev               # http://localhost:3000
```

One oddity: this app's `.gitignore` ignores `.env*`, so `.env.local.example` is
invisible to git even though it is meant to be shared. If you want teammates to
get it, add `!.env.local.example` to `.gitignore` or force it in with
`git add -f .env.local.example`.

Check the two are talking to each other by opening
<http://localhost:5000/api/health>. In a component, one call replaces the whole
mock object:

```jsx
"use client";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.dashboard
      .get()
      .then(setData)
      .catch((e) => setError(e instanceof ApiError ? e.message : "Something went wrong."));
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading…</p>;
  return <h1>{data.student.greeting}</h1>;
}
```

## The one idea worth knowing

The API returns display-ready strings, not just raw values. `formatNaira`,
`formatDueDate` and the rest live in `backend/config/constants.js`, and they were
written by copying the exact output your components already render. So the payload
contains `"₦3,000"`, `"Due Fri, 27 Mar"`, `"In 4 days"`, `"2 minutes ago"`,
`"NEXT LESSON · 09"`, `"1 of 3 lessons complete"` and `"7:00 AM – 3:00 PM"` — the
strings themselves, already formatted.

That is deliberate. It means replacing mock data is usually a substitution rather
than a rewrite: wherever a component has a hardcoded string, there is a field with
the same string in it. Raw numbers are always there too (`progress.percent`
alongside `progress.percentLabel`) for when you need to compute something.

## Authentication

There are two separate sessions, because an administrator is not a student with a
flag set. Students sign in at `/api/auth/login` and get a token signed with
`JWT_SECRET` that lasts seven days. Admins sign in at `/api/admin/auth/login` and
get a token signed with a *different* secret, `ADMIN_JWT_SECRET`, that lasts
twelve hours. Two secrets means that if the student one ever leaks, nobody gets the
admin console with it.

`lib/api.js` keeps both in `localStorage` under `wofbi-token` and
`wofbi-admin-token` (the `wofbi-` prefix matches the `wofbi-application` key this
app already uses) and attaches the right one automatically. `auth.login()`,
`auth.verifyEmail()` and `admin.auth.login()` store the token for you:

```js
import { auth, admin, tokens } from "@/lib/api";

await auth.login(email, password);        // student token stored
await admin.auth.login(email, password);  // admin token stored
auth.logout();                            // clears the student token only
tokens.student();                         // read it if you need it yourself
```

Registration is a three-step flow: `auth.register()` creates the account and emails
a six-digit code, `auth.verifyEmail(email, otp)` activates it and returns a token,
and `auth.completeRegistration()` fills in the profile. Logging in before
verifying returns 403 with `code: "EMAIL_NOT_VERIFIED"` — send the user to the OTP
screen rather than showing them an error.

## Errors

Anything that is not a 2xx throws an `ApiError` with three useful properties:
`status`, a stable `code`, and `errors` — a field-to-message map meant to be
rendered inline next to the offending input.

```js
try {
  await api.applications.submit();
} catch (error) {
  if (error.errors) setFieldErrors(error.errors);   // { email: "...", phone: "..." }
  else if (error.code === "SESSION_EXPIRED") router.push("/onboarding/login");
  else setBanner(error.message);
}
```

Branch on `code`, not on `message`: the wording may be improved, the codes will
not. The ones worth handling are `EMAIL_NOT_VERIFIED`, `REGISTRATION_INCOMPLETE`,
`SESSION_EXPIRED`, `APPLICATION_LOCKED` (already submitted, so the form is
read-only), `PAYMENT_ALREADY_APPROVED`, `PREREQUISITE_NOT_MET` (the LCC/LDC
progression rule), `RATE_LIMITED` (with `errors.retryAfterSeconds`) and
`NETWORK_ERROR`, which the client raises itself when the backend is not running.

Messages are written to be shown to users as-is. "You do not have a payment record
yet. Submit your application first." is meant for the screen, not the console.

## The student dashboard in one call

`GET /api/dashboard` returns everything the user dashboard displays. It is one
endpoint rather than nine because all those panels are on screen at once, and nine
round trips would show the page assembling itself.

| Field | What it feeds |
| --- | --- |
| `student` | `greeting` ("Welcome to wofbi online registration, Ada."), `studentId`, `intakeBadge` ("Spring 2026 intake · BCC") |
| `stats` | The four cards: Student ID, Attendance, Payment status, Class of |
| `milestones` | The four-step path: submitted, paid, coursework, graduation |
| `nextAction` | `{ label, href, hint }` for the primary button — what to do next |
| `progress` | `percent`, `percentLabel`, `countLabel` ("1 of 3 lessons"), `remainingLabel` ("2 lessons to go") |
| `continueLearning` | The dark resume card: `moduleTitle`, `courseModuleLine`, `lecturerLine`, `statusBadge`, `cohortLabel`, and `nextLesson` with `headingLabel` and `metaLine` |
| `classSchedule` | Covenant Practice: `timeRange`, `days`, `venue` |
| `assignments` | Up to five upcoming, each with `dueLabel`, `dueRelative`, `submitted` |
| `announcements` | `{ items, latest, unreadCount, unreadLabel }` — `unreadLabel` is the "2 new" badge |
| `attendance` | `rate`, `rateLabel` ("94%"), `present`, `absent`, `excused`, `total`, plus `checkedIn` and `today` for the check-in button |
| `payment`, `fee`, `bank` | Status, the ₦3,000 fee, and the transfer details card |
| `application` | `status`, `applicationId`, `furthestStep`, `reviewNote` |
| `certificates` | Issued certificates with verification numbers |

`progress` is computed at read time from the student's completion records, never
stored, so it cannot drift. Completions that point at a lesson an admin has since
unpublished are excluded, which is what stops anyone going over 100%.

## The admin console

`GET /api/admin/overview` is the equivalent single call for the admin landing page:
`hero` (total learners), `kpis` (the eight cards, each with `value`, `detail` and
`raw`), `recentRegistrations`, `recentPayments`, `upcomingClasses`, `notifications`
and `queues`.

Two behaviours are worth knowing before you wire the modals.

**References work as ids.** `ApplicantDetailsModal` is rendered with
`"APP-1284"`, and `PaymentDetailsModal` with `"PAY-26041"` or the receipt number
`"RCT-26041"`. Every admin detail endpoint accepts either that human reference or
a raw ObjectId, so you can pass straight through whatever the table row gave you:

```js
const { application } = await admin.applications.get("APP-1284");
await admin.applications.decide("APP-1284", "Approved");
```

**Approving twice is safe.** Approving an application issues a student ID, marks
registration complete and creates the enrollment — and doing it again does none of
those a second time. If a decision is later reversed, the enrolment is withdrawn
but the student ID is kept: those get printed and quoted in letters, and recycling
one would mean two people sharing a number in somebody's records.

Notifications and upcoming classes are derived on the fly — from applications
awaiting review, receipts awaiting confirmation, and the recurring timetable —
rather than stored. Nothing can fall out of step with reality, and there is nothing
to clean up.

## Files

Passport photographs and payment receipts are stored in MongoDB itself using
GridFS, so nothing is lost when the server redeploys onto a fresh filesystem and
there are no storage credentials to manage.

Uploads go as `FormData`; the client sets no `Content-Type` header, because the
browser has to set it itself to include the multipart boundary:

```js
await api.applications.upload("photo", file);     // PNG or JPG, max 5 MB
await api.payments.uploadReceipt(file);           // PNG, JPG or PDF
```

Every file in a payload arrives as `{ id, url, name, size, sizeLabel, contentType }`.
An `<img>` tag cannot send an Authorization header, so use the helper, which adds
the token to the query string — the one place the API accepts one:

```jsx
import { authorizedFileUrl } from "@/lib/api";

<img src={authorizedFileUrl(application.photo, "admin")} alt="Passport photograph" />
```

## Replacing the saved draft

`CourseEnrollment.jsx` currently keeps the application in `localStorage` under
`wofbi-application`, and `user/payments/page.jsx` reads it back. The API version of
that is `PATCH /api/applications/me`, which takes a partial update using the same
field names the form already uses:

```js
await api.applications.saveDraft({ firstName, lastName, email, furthestStep: 1 });
```

Send only what changed. `furthestStep` remembers how far they got and only ever
moves forward, so navigating back does not lose their place. When the form is
complete, `api.applications.submit()` validates every required field at once (35
of them), returns `errors` keyed by field name if anything is missing, and on
success creates the payment record and emails a confirmation.

Worth keeping the localStorage save as well as the API call at first: it costs
nothing and means a draft survives a lost connection.

## Endpoint reference

Everything is under `/api`. Student routes need a student token, admin routes an
admin token; `POST /api/auth/*`, `GET /api/health` and
`GET /api/certificates/verify/:number` are public.

### Student

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Is the API up |
| POST | `/auth/register` | Create an account, sends an OTP |
| POST | `/auth/login` | Sign in |
| POST | `/auth/verify-email` | Activate with the OTP |
| POST | `/auth/resend-verification-otp` | New code |
| POST | `/auth/forgot-password` | Email a reset link |
| POST | `/auth/reset-password/:token` | Set a new password |
| GET | `/auth/me` | Current student |
| PATCH | `/auth/complete-registration` | Finish the profile |
| GET | `/dashboard` | The whole dashboard |
| GET · PATCH | `/applications/me` | Read and partially save the form |
| POST | `/applications/me/submit` | Submit for review |
| POST · DELETE | `/applications/me/files/:kind` | Photo or receipt (`photo`, `receipt`) |
| GET | `/payments/me` | Fee, status, bank details |
| POST | `/payments/me/receipt` | Upload or replace the receipt |
| GET | `/courses` · `/courses/access` | The three cards, and which are unlocked |
| GET | `/courses/:code` · `/courses/:code/lessons` | Course and its lessons |
| POST | `/courses/:code/enroll` | Enrol, if the prerequisite is met |
| GET | `/courses/:code/lessons/:number` | One lesson |
| POST · DELETE | `/courses/:code/lessons/:number/complete` | Mark done, or undo |
| GET | `/attendance/me` | Rate and history |
| POST | `/attendance/me/check-in` | Self check-in for today |
| GET | `/assignments` · `/assignments/:id` | Coursework |
| POST | `/assignments/:id/submit` | Submit text and/or a file |
| GET | `/announcements` | With read state |
| POST | `/announcements/:id/read` · `/read-all` | Mark read |
| GET | `/certificates/me` · `/certificates/:id/download` | Own certificates |
| GET | `/certificates/verify/:number` | Public verification |
| GET | `/files/:id` · `/files/:id/meta` | Stored file, by header or `?token=` |

### Admin

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/admin/auth/login` | Admin sign-in |
| GET | `/admin/auth/me` | Current admin |
| POST | `/admin/auth/change-password` | Change it, returns a fresh token |
| GET | `/admin/overview` | KPIs, activity, notifications, queues |
| GET | `/admin/applications` | Filter by `status`, `search`, paged |
| GET · POST | `/admin/applications/:ref` · `/:ref/decision` | Detail, then Approve / Request info / Reject |
| GET | `/admin/payments` | With per-status summary counts |
| GET · POST | `/admin/payments/:ref` · `/:ref/decision` | Detail, then confirm or reject |
| GET | `/admin/students` · `/admin/students/:id/attendance` | Roster and register |
| GET · POST · PATCH | `/admin/courses` · `/admin/courses/:code` | Manage programmes |
| GET · POST | `/admin/courses/:code/lessons` | List and add lessons |
| PATCH · DELETE | `/admin/lessons/:id` | Edit, or retire (unpublish) |
| GET · POST | `/admin/courses/:code/assignments` | Coursework |
| PATCH | `/admin/assignments/:id` | Edit coursework |
| GET | `/admin/assignments/:id/submissions` | Submissions |
| POST | `/admin/submissions/:id/grade` | Score and feedback |
| GET · POST · PATCH · DELETE | `/admin/announcements` | Publish and retire |
| GET · POST | `/admin/attendance` | Daily register, and mark it |
| GET · POST | `/admin/certificates` | Issue |
| POST | `/admin/certificates/:id/revoke` | Revoke, reason required |
| GET | `/admin/completions` | Who is eligible |
| GET · POST | `/admin/admins` | Super admins only |

`npm run check` in `backend/` prints this table from the live route stack, so it
cannot go stale.

## Things that will trip you up

Sign-in, registration, OTP, password-reset and upload routes are all rate limited
(eight sign-in attempts per fifteen minutes, five OTP requests, forty uploads per
hour). A successful sign-in clears the counter, so a few mistyped passwords will
not lock someone out once they get in. While testing a login screen repeatedly, set
`DISABLE_RATE_LIMIT=true` in the backend `.env`. Never in production.

Deleting is avoided on purpose. Retiring a lesson unpublishes it, because students'
completion records point at it. Revoking a certificate keeps the row, because
public verification needs to be able to say "this number exists but is no longer
valid". Rejecting an approved application withdraws the place but keeps the
student ID.

Course progression is enforced server-side: enrolling in LCC before finishing BCC
returns `PREREQUISITE_NOT_MET`. `GET /api/courses/access` tells you which cards to
show as unlocked — each course carries a boolean `locked` and a `statusMessage`,
which is the course's own `lockedMessage` or `availableMessage` depending on which
applies, so it can be rendered under the course name without a conditional.

Dates are formatted from the local calendar, not `toISOString()`. Lagos is UTC+1,
so a registration made at half past midnight would otherwise come back as the
previous day and disagree with its own display label.

If you deploy the frontend somewhere other than `CLIENT_URL`, add that origin to
`ALLOWED_ORIGINS` in the backend `.env` or the browser will block the requests.
