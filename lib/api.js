/**
 * Client for the WOFBI backend API.
 *
 * NEW FILE — nothing that already existed in this app has been changed. Import it
 * where you are ready to replace mock data:
 *
 *   import { api, auth, ApiError } from "@/lib/api";
 *
 *   const { student, stats, milestones } = await api.dashboard.get();
 *   setStats(stats);
 *
 * Every endpoint returns the parsed JSON body. Anything that is not a 2xx throws
 * an `ApiError` carrying the status, a stable `code`, and a field -> message map
 * you can render inline next to the offending input.
 *
 * The API is designed to serve display-ready strings — "₦3,000", "Due Fri, 27 Mar",
 * "2 minutes ago", "NEXT LESSON · 09" — so a component can usually render a field
 * directly instead of formatting it again.
 */

/* -------------------------------------------------------------------- setup -- */

/**
 * Where the Express server lives. Set NEXT_PUBLIC_API_URL in `.env.local`
 * (see .env.local.example). The trailing slash is trimmed so callers never have
 * to think about double slashes.
 */
export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://backend-ye87.onrender.com/api").replace(
  /\/+$/,
  "",
);

/**
 * Token storage keys. `wofbi-` matches the prefix this app already uses for the
 * saved application draft, so everything belonging to the portal sorts together
 * in devtools.
 */
const STUDENT_TOKEN_KEY = "wofbi-token";
const ADMIN_TOKEN_KEY = "wofbi-admin-token";

/** localStorage is not available during server rendering. */
const store = () => (typeof window === "undefined" ? null : window.localStorage);

export const tokens = {
  student: () => store()?.getItem(STUDENT_TOKEN_KEY) || null,
  admin: () => store()?.getItem(ADMIN_TOKEN_KEY) || null,
  setStudent(token) {
    if (token) store()?.setItem(STUDENT_TOKEN_KEY, token);
  },
  setAdmin(token) {
    if (token) store()?.setItem(ADMIN_TOKEN_KEY, token);
  },
  clearStudent() {
    store()?.removeItem(STUDENT_TOKEN_KEY);
  },
  clearAdmin() {
    store()?.removeItem(ADMIN_TOKEN_KEY);
  },
};

/* -------------------------------------------------------------------- errors -- */

/**
 * A failed request.
 *
 * `code` is the stable identifier to branch on — the wording of `message` may be
 * improved over time, the codes will not. The ones worth handling explicitly:
 *
 *   EMAIL_NOT_VERIFIED       sign-in blocked; send them to the OTP screen
 *   REGISTRATION_INCOMPLETE  profile unfinished; send them to onboarding
 *   SESSION_EXPIRED          token no longer valid; sign them out
 *   RATE_LIMITED             too many attempts; `errors.retryAfterSeconds` says how long
 *   PAYLOAD_TOO_LARGE        body or upload above the limit
 */
export class ApiError extends Error {
  constructor(message, { status = 0, code = null, errors = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    /** @type {Record<string, string> | null} field -> message, for inline display */
    this.errors = errors;
  }

  /** True when the caller needs to sign in again. */
  get isAuthError() {
    return this.status === 401;
  }
}

/* ------------------------------------------------------------------ transport -- */

/**
 * @param {string} path      e.g. "/dashboard" — the /api prefix is already in API_BASE
 * @param {object} [options]
 * @param {string} [options.method="GET"]
 * @param {object} [options.body]      sent as JSON
 * @param {FormData} [options.form]    sent as multipart; use for uploads
 * @param {"student"|"admin"|null} [options.as="student"] which token to attach
 * @param {object} [options.query]     appended as a query string, blanks dropped
 * @param {AbortSignal} [options.signal]
 */
const request = async (path, { method = "GET", body, form, as = "student", query, signal } = {}) => {
  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(query || {})) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  }

  const headers = {};
  const token = as === "admin" ? tokens.admin() : as === "student" ? tokens.student() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  // Deliberately no Content-Type for FormData: the browser has to set it itself so
  // it can include the multipart boundary. Setting it by hand breaks the upload.
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    // fetch only rejects for network-level failures, so this really is "no server".
    throw new ApiError(
      `Could not reach the API at ${API_BASE}. Is the backend running?`,
      { status: 0, code: "NETWORK_ERROR" },
    );
  }

  // 204s and file streams have no JSON body.
  const isJson = (response.headers.get("content-type") || "").includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(payload?.message || `Request failed (${response.status})`, {
      status: response.status,
      code: payload?.code || null,
      errors: payload?.errors || null,
    });
  }

  return payload ?? { success: true };
};

/** Turn { photo: File } into FormData. The field name must match what the API expects. */
const formOf = (field, file) => {
  const form = new FormData();
  form.append(field, file);
  return form;
};

/* --------------------------------------------------------------------- auth -- */

/**
 * Sign-in and account routes. `login` and `verifyEmail` store the returned token
 * for you, so every later call is authenticated automatically.
 */
export const auth = {
  /**
   * Creates the account and returns a usable token straight away, alongside
   * `requiresEmailVerification: true`. The token is stored so the OTP screen — and
   * the dashboard behind it — need no second sign-in; `/auth/login` is what refuses
   * an unverified address, not the token itself.
   */
  async register(details) {
    const data = await request("/auth/register", { method: "POST", body: details, as: null });
    tokens.setStudent(data.token);
    return data;
  },

  async login(email, password) {
    const data = await request("/auth/login", {
      method: "POST",
      body: { email, password },
      as: null,
    });
    tokens.setStudent(data.token);
    return data;
  },

  /**
   * Confirms the six-digit code. Note this route answers with the user but *no*
   * token — the one from `register` is still the live session. `setStudent`
   * ignores a missing value, so this stays correct either way.
   */
  async verifyEmail(email, otp) {
    const data = await request("/auth/verify-email", {
      method: "POST",
      body: { email, otp },
      as: null,
    });
    tokens.setStudent(data.token);
    return data;
  },

  resendOtp: (email) =>
    request("/auth/resend-verification-otp", { method: "POST", body: { email }, as: null }),

  forgotPassword: (email) =>
    request("/auth/forgot-password", { method: "POST", body: { email }, as: null }),

  resetPassword: (token, password, confirmPassword) =>
    request(`/auth/reset-password/${encodeURIComponent(token)}`, {
      method: "POST",
      body: { password, confirmPassword },
      as: null,
    }),

  me: () => request("/auth/me"),

  completeRegistration: (details) =>
    request("/auth/complete-registration", { method: "PATCH", body: details }),

  logout: () => tokens.clearStudent(),
};

/* ---------------------------------------------------------------------- api -- */

export const api = {
  /**
   * The whole student dashboard in one request: greeting, stat cards, milestones,
   * next action, progress, next lesson, class schedule, assignments,
   * announcements, attendance, payment, fee, bank details and certificates.
   *
   * One call rather than nine, because every one of those panels is on screen at
   * the same time and nine round trips would show the page assembling itself.
   */
  dashboard: {
    get: (options) => request("/dashboard", options),
  },

  /** The four-step enrollment form. */
  applications: {
    get: () => request("/applications/me"),
    /**
     * Partial save — send only the fields that changed, using the same names the
     * form already uses (`firstName`, `preferredCourse`, …). Unknown keys are
     * ignored rather than rejected, so posting the whole form object is fine too.
     *
     * Pass `furthestStep` (0-3) to remember how far the applicant got; it only
     * ever moves forward, so navigating back does not lose their place.
     */
    saveDraft: (fields) => request("/applications/me", { method: "PATCH", body: fields }),
    /**
     * Final submit. The last step's answers can travel with it — the route runs
     * the same field whitelist as the draft save — so the wizard does not need to
     * PATCH and then POST.
     */
    submit: (fields) => request("/applications/me/submit", { method: "POST", body: fields }),
    /** @param {"photo"|"receipt"} kind */
    upload: (kind, file) =>
      request(`/applications/me/files/${kind}`, { method: "POST", form: formOf(kind, file) }),
    removeFile: (kind) => request(`/applications/me/files/${kind}`, { method: "DELETE" }),
  },

  /**
   * The ₦3,000 registration fee and its receipt.
   *
   * There is nothing to send but the file: the amount is fixed, and the payment
   * date is taken as the upload time. Re-uploading replaces the previous receipt
   * and puts the payment back into "Pending" for review.
   */
  payments: {
    get: () => request("/payments/me"),
    uploadReceipt: (file) =>
      request("/payments/me/receipt", { method: "POST", form: formOf("receipt", file) }),
  },

  /** Programmes, lessons and lesson completion. */
  courses: {
    /**
     * The three course cards with this student's state on each: `locked`,
     * `statusMessage`, `enrolled`, `progress`. This is what the enrollment page
     * renders — readable before registration is finished, which is the point.
     */
    list: () => request("/courses"),
    /** A cheap yes/no gate: is course *content* unlocked for this account yet? */
    access: () => request("/courses/access"),
    get: (code) => request(`/courses/${code}`),
    enroll: (code) => request(`/courses/${code}/enroll`, { method: "POST" }),
    lessons: (code) => request(`/courses/${code}/lessons`),
    lesson: (code, number) => request(`/courses/${code}/lessons/${number}`),
    completeLesson: (code, number) =>
      request(`/courses/${code}/lessons/${number}/complete`, { method: "POST" }),
    uncompleteLesson: (code, number) =>
      request(`/courses/${code}/lessons/${number}/complete`, { method: "DELETE" }),
  },

  attendance: {
    me: () => request("/attendance/me"),
    checkIn: () => request("/attendance/me/check-in", { method: "POST" }),
  },

  assignments: {
    list: (query) => request("/assignments", { query }),
    get: (id) => request(`/assignments/${id}`),
    submit: (id, { text, file } = {}) => {
      if (!file) return request(`/assignments/${id}/submit`, { method: "POST", body: { text } });
      const form = formOf("attachment", file);
      if (text) form.append("text", text);
      return request(`/assignments/${id}/submit`, { method: "POST", form });
    },
  },

  announcements: {
    list: () => request("/announcements"),
    markRead: (id) => request(`/announcements/${id}/read`, { method: "POST" }),
    markAllRead: () => request("/announcements/read-all", { method: "POST" }),
  },

  certificates: {
    me: () => request("/certificates/me"),
    /** Public — no token needed, for a "verify this certificate" page. */
    verify: (number) =>
      request(`/certificates/verify/${encodeURIComponent(number)}`, { as: null }),
    /**
     * Resolves to `{ url, filename }` ready for `<a href download>`. The API
     * answers with the path to the stored PDF; the token is added here because the
     * browser will follow that link without an Authorization header.
     */
    async download(id) {
      const { url, filename } = await request(`/certificates/${id}/download`);
      return { url: fileUrl(url.replace(/^\/api/, "")), filename };
    },
  },

  health: () => request("/health", { as: null }),
};

/* -------------------------------------------------------------------- files -- */

/**
 * A URL suitable for `<img src>` or `<iframe src>`.
 *
 * An image tag cannot send an Authorization header, so the token goes in the
 * query string — the one place the API accepts it. Use the normal fetch helpers
 * anywhere you control the request.
 *
 * @param {string} idOrPath a GridFS file id, or a full path like "/certificates/x/download"
 * @param {"student"|"admin"} [as]
 */
export const fileUrl = (idOrPath, as = "student") => {
  const token = as === "admin" ? tokens.admin() : tokens.student();
  const path = String(idOrPath).startsWith("/") ? idOrPath : `/files/${idOrPath}`;
  if (!token) return `${API_BASE}${path}`;
  // Some paths already carry a query string (`?download=1`), so the separator has
  // to be chosen rather than assumed.
  return `${API_BASE}${path}${path.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}`;
};

/**
 * Files arrive as `{ id, filename, contentType, size, uploadedAt, url }`, where
 * `url` is the unauthenticated path. This adds the token to that path.
 */
export const authorizedFileUrl = (file, as = "student") =>
  file?.url ? fileUrl(file.url.replace(/^\/api/, ""), as) : null;

/* -------------------------------------------------------------------- admin -- */

/**
 * The admin console. A separate login, a separate token and a shorter session —
 * an admin token is not a student token with a flag on it.
 */
export const admin = {
  auth: {
    async login(email, password) {
      const data = await request("/admin/auth/login", {
        method: "POST",
        body: { email, password },
        as: null,
      });
      tokens.setAdmin(data.token);
      return data;
    },
    me: () => request("/admin/auth/me", { as: "admin" }),
    async changePassword(currentPassword, newPassword) {
      const data = await request("/admin/auth/change-password", {
        method: "POST",
        body: { currentPassword, newPassword },
        as: "admin",
      });
      // The API issues a fresh token, so the current session stays valid.
      tokens.setAdmin(data.token);
      return data;
    },
    logout: () => tokens.clearAdmin(),
  },

  /** Everything on the admin landing page: KPIs, hero, activity, notifications. */
  overview: () => request("/admin/overview", { as: "admin" }),

  applications: {
    /** @param {{status?: string, search?: string, page?: number, limit?: number}} [query] */
    list: (query) => request("/admin/applications", { as: "admin", query }),
    /** Accepts the reference shown in the table ("APP-1284") or an id. */
    get: (reference) => request(`/admin/applications/${reference}`, { as: "admin" }),
    /**
     * @param {"Approved"|"Request info"|"Rejected"} decision
     * @param {string} [note] required for "Request info" and for rejections
     */
    decide: (reference, decision, note) =>
      request(`/admin/applications/${reference}/decision`, {
        method: "POST",
        body: { decision, note },
        as: "admin",
      }),
  },

  payments: {
    list: (query) => request("/admin/payments", { as: "admin", query }),
    /** Accepts a payment id, "PAY-26041", or the receipt number "RCT-26041". */
    get: (reference) => request(`/admin/payments/${reference}`, { as: "admin" }),
    decide: (reference, status, note) =>
      request(`/admin/payments/${reference}/decision`, {
        method: "POST",
        body: { status, note },
        as: "admin",
      }),
  },

  students: {
    list: (query) => request("/admin/students", { as: "admin", query }),
    attendance: (id, query) =>
      request(`/admin/students/${id}/attendance`, { as: "admin", query }),
  },

  courses: {
    list: () => request("/admin/courses", { as: "admin" }),
    create: (course) => request("/admin/courses", { method: "POST", body: course, as: "admin" }),
    update: (code, fields) =>
      request(`/admin/courses/${code}`, { method: "PATCH", body: fields, as: "admin" }),
    lessons: (code) => request(`/admin/courses/${code}/lessons`, { as: "admin" }),
    addLesson: (code, lesson) =>
      request(`/admin/courses/${code}/lessons`, { method: "POST", body: lesson, as: "admin" }),
  },

  lessons: {
    update: (id, fields) =>
      request(`/admin/lessons/${id}`, { method: "PATCH", body: fields, as: "admin" }),
    /** Unpublishes rather than deletes — students' progress points at these rows. */
    retire: (id) => request(`/admin/lessons/${id}`, { method: "DELETE", as: "admin" }),
  },

  coursework: {
    list: (code) => request(`/admin/courses/${code}/assignments`, { as: "admin" }),
    create: (code, assignment) =>
      request(`/admin/courses/${code}/assignments`, {
        method: "POST",
        body: assignment,
        as: "admin",
      }),
    update: (id, fields) =>
      request(`/admin/assignments/${id}`, { method: "PATCH", body: fields, as: "admin" }),
    submissions: (id) => request(`/admin/assignments/${id}/submissions`, { as: "admin" }),
    grade: (submissionId, score, feedback) =>
      request(`/admin/submissions/${submissionId}/grade`, {
        method: "POST",
        body: { score, feedback },
        as: "admin",
      }),
  },

  announcements: {
    list: (query) => request("/admin/announcements", { as: "admin", query }),
    create: (announcement) =>
      request("/admin/announcements", { method: "POST", body: announcement, as: "admin" }),
    update: (id, fields) =>
      request(`/admin/announcements/${id}`, { method: "PATCH", body: fields, as: "admin" }),
    retire: (id) => request(`/admin/announcements/${id}`, { method: "DELETE", as: "admin" }),
  },

  attendance: {
    /** The register for one day: every active student, marked or not. */
    register: (query) => request("/admin/attendance", { as: "admin", query }),
    /** @param {Array<{user: string, status: "Present"|"Absent"|"Excused"}>} records */
    mark: (date, records) =>
      request("/admin/attendance", { method: "POST", body: { date, records }, as: "admin" }),
  },

  certificates: {
    list: (query) => request("/admin/certificates", { as: "admin", query }),
    /** `force: true` overrides the "coursework not finished" refusal. */
    issue: (details) =>
      request("/admin/certificates", { method: "POST", body: details, as: "admin" }),
    revoke: (id, reason) =>
      request(`/admin/certificates/${id}/revoke`, {
        method: "POST",
        body: { reason },
        as: "admin",
      }),
    completions: () => request("/admin/completions", { as: "admin" }),
  },

  /** Super admins only. There is no public admin sign-up. */
  admins: {
    list: () => request("/admin/admins", { as: "admin" }),
    create: (details) => request("/admin/admins", { method: "POST", body: details, as: "admin" }),
  },
};

export default api;
