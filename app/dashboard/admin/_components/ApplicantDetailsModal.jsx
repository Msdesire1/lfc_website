"use client";

/**
 * The admissions review modal.
 *
 * The table hands over the reference it rendered ("APP-1284") and this fetches the
 * record itself, so the list only has to carry enough for its own row. The detail
 * endpoint answers with the summary, the whole form, the payment and the account
 * in one request, which is what makes a decision possible without leaving here.
 *
 * Approve, Request info and Reject all post to the same decision route. A note is
 * mandatory for the last two — an applicant told only "we need more information"
 * has no idea what to change.
 */

import { useEffect, useState } from "react";
import { X, Mail, Phone, BookOpen, CalendarDays, CreditCard, Hash, User, FileText, Image as ImageIcon } from "lucide-react";
import { admin, authorizedFileUrl } from "@/lib/api";
import { messageOf, useAction, useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";

const statusTone = (status) =>
  status === "Paid" || status === "Approved"
    ? "bg-emerald-50 text-emerald-700"
    : status === "Pending" || status === "Review"
    ? "bg-amber-50 text-amber-700"
    : status === "Rejected"
    ? "bg-red-50 text-red-700"
    : "bg-slate-100 text-slate-700";

/**
 * The answers, in the order the applicant filled them in, with the same wording
 * the form used. Kept here rather than sent by the API because these are display
 * strings, and a key with no entry is simply not shown — an unfinished draft has
 * plenty of those.
 */
const FORM_SECTIONS = [
  [
    "Personal details",
    [
      ["title", "Title"],
      ["firstName", "First name"],
      ["lastName", "Surname"],
      ["email", "Email address"],
      ["phone", "Phone number"],
      ["gender", "Gender"],
      ["dateOfBirth", "Date of birth"],
      ["placeOfBirth", "Place of birth"],
      ["nativeTown", "Native town"],
      ["state", "State of origin"],
      ["country", "Country"],
      ["address", "Residential address"],
      ["maritalStatus", "Marital status"],
      ["languages", "Languages spoken"],
      ["understandsEnglish", "Understands English"],
      ["writesEnglish", "Writes English"],
    ],
  ],
  [
    "Work, education & health",
    [
      ["occupation", "Occupation"],
      ["schoolType", "Type of school attended"],
      ["schoolName", "Name of school"],
      ["dateAttended", "Dates attended"],
      ["certificate", "Certificate obtained"],
      ["physicalDefects", "Physical defects"],
    ],
  ],
  [
    "Spiritual information",
    [
      ["bornAgainDate", "Date born again"],
      ["waterBaptized", "Water baptism"],
      ["holySpiritBaptized", "Holy Spirit baptism"],
      ["discipleshipClass", "Discipleship class"],
      ["bibleTraining", "Previous Bible training"],
      ["wofbiReason", "Reason for attending WOFBI"],
      ["afterCoursePlan", "Plans after the course"],
      ["christianService", "Christian service experience"],
      ["pastorNameAddress", "Pastor's name and address"],
      ["churchSponsorship", "Church sponsorship"],
    ],
  ],
  [
    "Declaration",
    [
      ["preferredCourse", "Preferred course"],
      ["declarationName", "Declaration name"],
      ["declarationDate", "Declaration date"],
    ],
  ],
];

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-700">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-slate-800">{value || "—"}</p>
      </div>
    </div>
  );
}

/** @param {{reference: string|null, onClose: () => void, onDecided?: (result: object) => void}} props */
export default function ApplicantDetailsModal({ reference, onClose, onDecided }) {
  const detail = useApi(() => admin.applications.get(reference), {
    as: "admin",
    enabled: Boolean(reference),
    deps: [reference],
  });
  const decide = useAction(
    (decision, note) => admin.applications.decide(reference, decision, note),
    { as: "admin" },
  );
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!reference) return undefined;
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reference, onClose]);

  // A fresh record means the previous note and message no longer apply.
  useEffect(() => {
    setNote("");
    setNotice("");
  }, [reference]);

  if (!reference) return null;

  const summary = detail.data?.summary || null;
  const form = detail.data?.application?.form || {};
  const photoUrl = authorizedFileUrl(summary?.photo, "admin");
  const receiptUrl = authorizedFileUrl(summary?.receipt, "admin");

  const send = async (decision) => {
    setNotice("");
    const { ok, data, error } = await decide.run(decision, note.trim());
    if (!ok) {
      setNotice(messageOf(error));
      return;
    }
    setNotice(data?.message || "Saved.");
    onDecided?.(data);
    detail.reload();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Applicant details for ${summary?.name || reference}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-[#343A40] p-6 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-red-500">Applicant details</p>
            <h2 className="mt-2 text-2xl font-bold">{summary?.name || reference}</h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                {summary?.id || reference}
              </span>
              {summary?.status && (
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(summary.status)}`}>
                  {summary.status}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {detail.loading && <Loading label="Loading the application…" />}
          {!detail.loading && detail.error && (
            <ErrorNote error={detail.error} onRetry={detail.reload} />
          )}

          {!detail.loading && summary && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail icon={User} label="Applicant" value={summary.name} />
                <Detail icon={Hash} label="Application ID" value={summary.id} />
                <Detail icon={BookOpen} label="Programme" value={summary.programme} />
                <Detail icon={CalendarDays} label="Intake" value={summary.intake} />
                <Detail icon={Mail} label="Email" value={summary.email} />
                <Detail icon={Phone} label="Phone" value={summary.phone} />
                <Detail icon={CreditCard} label="Payment" value={summary.payment} />
                <Detail icon={CalendarDays} label="Submitted" value={summary.registeredOn} />
              </div>

              {/* The two files a decision actually rests on. Both open through the
                  authenticated file route, so neither is guessable from its URL. */}
              {(photoUrl || receiptUrl) && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {photoUrl && (
                    <a
                      href={photoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      <ImageIcon size={16} /> Passport photograph
                    </a>
                  )}
                  {receiptUrl && (
                    <a
                      href={receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      <FileText size={16} /> Payment receipt
                    </a>
                  )}
                </div>
              )}

              {summary.reviewNote && (
                <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <span className="font-semibold">Last review note:</span> {summary.reviewNote}
                </p>
              )}

              {FORM_SECTIONS.map(([heading, fields]) => {
                const answered = fields.filter(([key]) => String(form[key] || "").trim() !== "");
                if (answered.length === 0) return null;
                return (
                  <section key={heading} className="mt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">{heading}</h3>
                    <dl className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200/80">
                      {answered.map(([key, label]) => (
                        <div key={key} className="flex gap-4 px-4 py-3 text-sm">
                          <dt className="w-44 shrink-0 text-slate-400">{label}</dt>
                          <dd className="min-w-0 flex-1 break-words font-medium text-slate-800">{form[key]}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                );
              })}

              <label className="mt-6 block text-sm">
                <span className="font-semibold text-slate-700">Note to the applicant</span>
                <span className="ml-1 text-slate-400">— required to request information or reject</span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Tell them exactly what is missing or wrong."
                  className="mt-2 w-full rounded-2xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              {notice && (
                <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  {notice}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Close
          </button>
          {summary && summary.status !== "Draft" && (
            <>
              <button
                type="button"
                onClick={() => send("Rejected")}
                disabled={decide.busy}
                className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => send("Request info")}
                disabled={decide.busy}
                className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-60"
              >
                Request info
              </button>
              <button
                type="button"
                onClick={() => send("Approved")}
                disabled={decide.busy}
                className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
              >
                {decide.busy ? "Saving…" : "Approve"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
