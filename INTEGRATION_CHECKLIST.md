# Integration checklist

The UI is wired to the API. This file lists the checks I could not run myself and
the order to run them in.

## What I could not verify from here

`npm run build` and `npm run lint` could not run in my sandbox: `node_modules` is a
Windows install, so the `.cmd` shims and `@next/swc-*-msvc` binary will not execute
on Linux, and a full eslint pass over the mounted folder timed out at ~178 s.

Instead I ran two narrow static checks over all 25 wired files. Both passed: every
file parses, every `api.*` / `auth.*` / `admin.*` call resolves to something
`lib/api.js` actually exports, and every named import (including all lucide icons)
exists in the module it comes from. That catches typos and missing exports, but not
type errors or anything Next.js only complains about at build time.

So, on Windows:

```
npm run lint
npm run build
```

`components/layout/AppShell.jsx` has 8 unused lucide imports (`CalendarDays`,
`Clock3`, `FileBadge`, `LifeBuoy`, `Settings2`, `TimerReset`, `Users`, `Video`).
Those predate my changes and are warnings, not errors.

## Before the smoke test

1. `cd C:\Users\HP\Desktop\backend` then `npm run seed` — creates the courses and
   the first admin. Without courses the admin courses page is legitimately empty.
2. Copy `lfc\.env.local.example` to `lfc\.env.local` and confirm
   `NEXT_PUBLIC_API_URL` points at the backend's port.
3. Start the backend (`npm start`), then the frontend (`npm run dev`).

There is no MongoDB in my sandbox and no route to Atlas, so nothing below has been
run against a real database.

## Smoke test, in this order

**Onboarding**

- Register a new student. You should land on the verify-email screen and receive an
  OTP by email.
- Enter the OTP. Verification issues no token by design, so it drops you at login.
- Log in. You should reach the student dashboard.
- Log out, use "Forgot password", follow the emailed link — it should open
  `/onboarding/reset-password?token=…` and let you set a new password.

**Student**

- The dashboard, overview, and payments pages should all show real data, no
  hardcoded ₦3,000 or fake reference.
- Fill and submit the enrollment form. The declaration step's answers are sent with
  the submit call, so check they survive in the admin view.
- Upload a receipt on the payments page. It should appear in the table, the filename
  should open through the authenticated file URL, and "Replace receipt" should
  disappear once an admin approves it.

**Admin**

- Log in at `/onboarding/admin` with the seeded credentials. This uses a separate
  token, so being logged in as a student should not grant admin access, and vice
  versa.
- The admin dashboard KPIs, recent registrations, recent payments, upcoming classes
  and notifications should all populate.
- Admissions: filter by status, search by name or reference, open an application.
  All four form sections should render; a section with no answers should be hidden
  rather than showing empty rows.
- Reject an application without a note — the server should refuse it. Add a note and
  it should save, and the row should move to the Rejected filter after the reload.
- Payments: open a receipt, approve it, then check the student's payments page
  reflects it.
- Courses: publish and unpublish a course, and confirm an unpublished one vanishes
  from the student-facing course list.

## Two loose ends in your working tree

`app/dashboard/user/schedule/page.jsx` shows as deleted. That is your own change —
I hold no delete permission and never touched it. Nothing in `app`, `components` or
`lib` references the route, so leaving it deleted is safe. To restore it:

```
git checkout -- app/dashboard/user/schedule/page.jsx
```

`app/dashboard/admin/_components/ApplicantDetailsModal.jsx` and
`app/dashboard/admin/payments/PaymentDetailsModal.jsx` were untracked when I
rewrote them, so git has no baseline to diff them against. I preserved the markup
and every className, but there is no `git diff` to prove it — read those two by eye.

Two scratch files in the backend could not be deleted (permission declined), so
they are neutralised instead of removed. To clear them:

```
del C:\Users\HP\Desktop\backend\probe.tmp.mjs C:\Users\HP\Desktop\backend\.env.backup-before-admin-keys
```

The `.env.backup-before-admin-keys` one holds real secrets. It matches a
`.gitignore` pattern so it cannot be committed, but it is worth removing anyway.
