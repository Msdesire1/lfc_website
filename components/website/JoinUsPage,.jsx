
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { churchMembers } from "@/lib/api";
import { getWsfLocationSuggestions } from "./wsflocation/Homecell";

export default function JoinUsPage({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [editing, setEditing] = useState(false);
  const [wsfSuggestionsOpen, setWsfSuggestionsOpen] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [editCredential, setEditCredential] = useState("");
  const [editReference, setEditReference] = useState("");
  const [editKeyInput, setEditKeyInput] = useState("");
  const [editsRemaining, setEditsRemaining] = useState(3);

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    dateOrdained: "",
    occupation: "",
    workingPlace: "",
    dateJoinedCommission: "",
    commissionLocation: "",
    newBirthDate: "",
    dateJoinedLfcNewJerusalem: "",
    wofbiProgramme: "",
    wofbiDateAttended: "",
    gender: "",
    maritalStatus: "",
    weddingAnniversary: "",
    spouseName: "",
    spousePhone: "",
    numberOfChildren: "",
    address: "",
    membershipStatus: "",
    wsfLocation: "",
    serviceUnit: "",
    birthdayAnniversarySmsConsent: false,
    consent: false,
  });
  const wsfLocationSuggestions = formData.address.trim()
    ? getWsfLocationSuggestions(formData.address)
    : [];

  useEffect(() => {
    if (!onClose) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "address") {
        updated.wsfLocation = "";
      }

      if (name === "maritalStatus" && value !== "Married") {
        updated.weddingAnniversary = "";
      }

      return updated;
    });
  };

  const handleLookup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { member } = await churchMembers.lookup(editReference.trim(), editKeyInput.trim());
      setMemberId(member.id);
      setEditCredential(editKeyInput.trim());
      setEditsRemaining(member.editsRemaining);
      setFormData({
        fullName: member.fullName || "",
        title: member.title || "",
        phone: member.phone || "",
        email: member.email || "",
        dateOfBirth: member.dateOfBirth || "",
        dateOrdained: member.dateOrdained || "",
        occupation: member.occupation || "",
        workingPlace: member.workingPlace || "",
        dateJoinedCommission: member.dateJoinedCommission || "",
        commissionLocation: member.commissionLocation || "",
        newBirthDate: member.newBirthDate || "",
        dateJoinedLfcNewJerusalem: member.dateJoinedLfcNewJerusalem || "",
        wofbiProgramme: member.wofbiProgramme || "",
        wofbiDateAttended: member.wofbiDateAttended || "",
        gender: member.gender || "",
        maritalStatus: member.maritalStatus || "",
        weddingAnniversary: member.weddingAnniversary || "",
        spouseName: member.spouseName || "",
        spousePhone: member.spousePhone || "",
        numberOfChildren: member.numberOfChildren ?? "",
        address: member.address || "",
        membershipStatus: member.membershipStatus || "",
        wsfLocation: member.wsfLocation || "",
        serviceUnit: member.serviceUnit || "",
        birthdayAnniversarySmsConsent: member.birthdayAnniversarySmsConsent === true,
        consent: member.consent === true,
      });
      setEditing(true);
    } catch (err) {
      setError(err?.message || "We could not find that member record.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.consent) {
      setError(
        "Please confirm that the information provided is correct."
      );
      setLoading(false);
      return;
    }

    try {
      if (editing) {
        const { member, message } = await churchMembers.update(memberId, formData, editCredential);
        setEditsRemaining(member.editsRemaining);
        setSuccess(message);
      } else {
        const { member, editCredential: issuedCredential, message } =
          await churchMembers.create(formData);
        setMemberId(member.id);
        setEditCredential(issuedCredential);
        setEditsRemaining(member.editsRemaining);
        setSuccess(message);
      }
    } catch (err) {
      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {onClose && (
        <button
          type="button"
          aria-label="Close join us form"
          onClick={onClose}
          className="fixed inset-0 z-[1100] bg-black/60"
        />
      )}
      <main className={onClose
        ? "fixed inset-4 z-[1101] mx-auto max-w-2xl overflow-y-auto rounded-2xl bg-[#f7f7f7] px-4 pb-10 pt-8  sm:inset-8 md:inset-y-6"
        : "min-h-screen bg-[#f7f7f7] pt-24 pb-16"}
      >
      <div className="relative mx-auto mb-5 flex max-w-3xl items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Living Faith Church New Jerusalem logo"
            width={64}
            height={64}
            priority
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
          {/* {onClose && <button
            type="button"
            aria-label="Close join us form"
            onClick={onClose}
            className="absolute right-0 rounded-full bg-white p-2 text-gray-700 shadow transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>} */}
      </div>

      {/* Page Header */}
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <p className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">
          LFC New Jerusalem, Ilorin
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Join Us
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
          Welcome to Living Faith Church New Jerusalem.
          Please fill out the form below with your details
          so we can get to know you and connect with you.
        </p>
      </div>

      {!editing && (
        <div className="mx-auto mb-5 flex max-w-3xl justify-center">
          <button
            type="button"
            onClick={() => {
              setUpdateMode((previous) => !previous);
              setSuccess("");
              setError("");
            }}
            className="text-sm font-semibold text-red-600 underline underline-offset-4"
          >
            {updateMode ? "Submit a new member form instead" : "Already submitted? Update your details"}
          </button>
        </div>
      )}

      {updateMode && !editing && (
        <form onSubmit={handleLookup} className="mx-auto mb-6 max-w-3xl space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Find your member record</h2>
            <p className="mt-1 text-sm text-gray-600">Use the member reference and private edit credential shown after your original submission.</p>
          </div>
          {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Member reference
              <input value={editReference} onChange={(event) => setEditReference(event.target.value)} required className="form-input mt-2" />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Edit credential
              <input value={editKeyInput} onChange={(event) => setEditKeyInput(event.target.value)} required className="form-input mt-2" autoComplete="off" />
            </label>
          </div>
          <button type="submit" disabled={loading} className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white disabled:opacity-60">
            {loading ? "Finding record..." : "Continue"}
          </button>
        </form>
      )}

      {/* Form Card */}
      {(!updateMode || editing) && <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/5">

        {/* Card Header */}
        <div className="bg-red-500 px-5 py-6 text-white sm:px-8">
          <h2 className="text-xl md:text-2xl font-bold">
            Church Member Registration
          </h2>

          <p className="mt-1 text-sm text-white/80">
            Kindly provide accurate information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-5 sm:p-8"
        >
          {/* Success */}
          {success && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
              <p>{success}</p>
              {editing ? (
                <p className="mt-2 text-sm">You have {editsRemaining} update{editsRemaining === 1 ? "" : "s"} remaining.</p>
              ) : (
                <div className="mt-3 space-y-1 break-all text-sm">
                  <p><strong>Member reference:</strong> {memberId}</p>
                  <p><strong>Private edit credential:</strong> {editCredential}</p>
                  <p className="mt-2 font-semibold">Save these details securely. You need both to update your form, and the credential cannot be recovered.</p>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="form-label">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>

              {/* Title */}
              <div>
                <label className="form-label">
                  Title *
                </label>

                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Dcn">Dcn</option>
                  <option value="Dcns">Dcns</option>
                  <option value="Dr">Dr</option>
                  <option value="Pastor">Pastor</option>
                  <option value="Elder">Elder</option>
                  <option value="Elder Mrs">Elder Mrs</option>
                  <option value="Ordained Worker">Ordained Worker</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="form-label">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="08012345678"
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="form-label">
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className="form-input"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="form-label">
                  Date of Birth *
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="form-label">
                  Gender *
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>
                </select>
              </div>

              {/* Marital Status */}
              <div>
                <label className="form-label">
                  Marital Status *
                </label>

                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">
                    Select status
                  </option>

                  <option value="Single">
                    Single
                  </option>

                  <option value="Married">
                    Married
                  </option>

                  <option value="Divorced">
                    Divorced
                  </option>

                  <option value="Widowed">
                    Widowed
                  </option>
                </select>
              </div>

              {formData.maritalStatus === "Married" && (
                <>
                  <div>
                    <label className="form-label">
                      Wedding Anniversary Date *
                    </label>

                    <input
                      type="date"
                      name="weddingAnniversary"
                      value={formData.weddingAnniversary}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Spouse&apos;s Name (optional)
                    </label>

                    <input
                      type="text"
                      name="spouseName"
                      value={formData.spouseName}
                      onChange={handleChange}
                      placeholder="Enter spouse's name"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Spouse&apos;s Phone Number (optional)
                    </label>

                    <input
                      type="tel"
                      name="spousePhone"
                      value={formData.spousePhone}
                      onChange={handleChange}
                      placeholder="08012345678"
                      className="form-input"
                    />
                  </div>

                </>
              )}

              {/* Number of Children */}
              <div>
                <label htmlFor="numberOfChildren" className="form-label">
                  Number of Children (optional)
                </label>

                <input
                  id="numberOfChildren"
                  type="number"
                  name="numberOfChildren"
                  value={formData.numberOfChildren}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="0"
                  className="form-input"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="form-label">
                  Residential Address or Area *
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Enter your residential address or area"
                  className="form-input resize-none"
                />
              </div>

              <div>
                <label htmlFor="occupation" className="form-label">
                  Occupation
                </label>
                <input
                  id="occupation"
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  maxLength={120}
                  placeholder="Enter your occupation"
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="workingPlace" className="form-label">
                  Working Place
                </label>
                <input
                  id="workingPlace"
                  type="text"
                  name="workingPlace"
                  value={formData.workingPlace}
                  onChange={handleChange}
                  maxLength={160}
                  placeholder="Enter your workplace"
                  className="form-input"
                />
              </div>

              {/* House Fellowship/WSF Centre */}
              <div
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setWsfSuggestionsOpen(false);
                  }
                }}
              >
                <label htmlFor="wsfLocation" className="form-label">
                  House Fellowship/WSF Centre
                </label>

                <input
                  id="wsfLocation"
                  type="text"
                  name="wsfLocation"
                  value={formData.wsfLocation}
                  onChange={handleChange}
                  onFocus={() => setWsfSuggestionsOpen(true)}
                  maxLength={240}
                  autoComplete="off"
                  placeholder="Enter or select a nearby WSF location"
                  className="form-input"
                />
                {wsfSuggestionsOpen && (
                  <div
                    className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                  >
                    {!formData.address.trim() ? (
                      <p className="px-2 py-2 text-sm text-gray-500">
                        Enter your residential address to find nearby WSF locations.
                      </p>
                    ) : wsfLocationSuggestions.length ? (
                      wsfLocationSuggestions.map((location) => {
                        const value = [location.name, location.address].filter(Boolean).join(" — ");
                        return (
                          <button
                            key={`${location.name}-${location.address}`}
                            type="button"
                            onPointerDown={(event) => event.preventDefault()}
                            onClick={() => {
                              setFormData((previous) => ({ ...previous, wsfLocation: value }));
                              setWsfSuggestionsOpen(false);
                            }}
                            className="block w-full rounded-md px-3 py-2 text-left hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none"
                          >
                            <span className="block text-sm font-semibold text-gray-900">{location.name}</span>
                            {location.address && (
                              <span className="block text-xs text-gray-500">{location.address}</span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <p className="px-2 py-2 text-sm text-gray-500">
                        No matching WSF locations found. You can enter a location manually.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Church Information */}
          <section className="border-t pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Church Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {formData.title === "Ordained Worker" && (
                <div>
                  <label htmlFor="dateOrdained" className="form-label">
                    Date Ordained
                  </label>
                  <input
                    id="dateOrdained"
                    type="date"
                    name="dateOrdained"
                    value={formData.dateOrdained}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              )}

              <div>
                <label htmlFor="dateJoinedCommission" className="form-label">
                  Date of Joining Commission
                </label>
                <input
                  id="dateJoinedCommission"
                  type="date"
                  name="dateJoinedCommission"
                  value={formData.dateJoinedCommission}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="commissionLocation" className="form-label">
                  Where You Joined the Commission
                </label>
                <input
                  id="commissionLocation"
                  type="text"
                  name="commissionLocation"
                  value={formData.commissionLocation}
                  onChange={handleChange}
                  maxLength={160}
                  placeholder="Enter the location"
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="newBirthDate" className="form-label">
                  New Birth Date
                </label>
                <input
                  id="newBirthDate"
                  type="date"
                  name="newBirthDate"
                  value={formData.newBirthDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="dateJoinedLfcNewJerusalem" className="form-label">
                  Date of Joining LFC New Jerusalem
                </label>
                <input
                  id="dateJoinedLfcNewJerusalem"
                  type="date"
                  name="dateJoinedLfcNewJerusalem"
                  value={formData.dateJoinedLfcNewJerusalem}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="wofbiProgramme" className="form-label">
                  WOFBI Programme or Level Attended
                </label>
                <input
                  id="wofbiProgramme"
                  type="text"
                  name="wofbiProgramme"
                  value={formData.wofbiProgramme}
                  onChange={handleChange}
                  maxLength={120}
                  placeholder="Enter programme or level"
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="wofbiDateAttended" className="form-label">
                  WOFBI Date Attended
                </label>
                <input
                  id="wofbiDateAttended"
                  type="date"
                  name="wofbiDateAttended"
                  value={formData.wofbiDateAttended}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Membership Status */}
              <div>
                <label className="form-label">
                  Membership Status *
                </label>

                <select
                  name="membershipStatus"
                  value={formData.membershipStatus}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">
                    Select membership status
                  </option>

                  <option value="New Member">
                    New Member
                  </option>

                  <option value="Existing Member">
                    Existing Member
                  </option>

                  <option value="First-time visitor">
                    First-time visitor
                  </option>
                </select>
              </div>



              {/* Service Unit */}
              <div>
                <label className="form-label">
                  Service Unit or Department
                </label>

                <select
                  name="serviceUnit"
                  value={formData.serviceUnit}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="" className="p-10">
                    Select service unit
                  </option>

                  <option value="Protocol">
                    Protocol
                  </option>

                    <option value="Media">
                    Media
                  </option>

              <option value="Technical">
                    Technical
                  </option>

                  <option value="Choir">
                    Choir
                  </option>

                  <option value="Sanctuary">
                    Sanctuary
                  </option>

                  <option value="Hospitality">
                    Hospitality
                  </option>

  <option value="Security">
Security
                  </option>
                  <option value="Ushering">
                    Ushering
                  </option>

                  <option value="Children&apos;s Church">
                    Children&apos;s Church
                  </option>

                  <option value="Security">
                    Security
                  </option>

                  <option value="Medical">
                    Medical
                  </option>

                  <option value="Evangelism">
                    Evangelism
                  </option>

                  <option value="Transport">
                    Transport
                  </option>
  <option value="Crowd Control ">
Crowd Control
                  </option>
  <option value="Traffic">
Traffic control
                  </option>

  <option value="Believers">
Believers
                  </option>
                  <option value="other">
Others
                  </option>
                </select>
              </div>

              {/* Birthday and anniversary SMS permission */}
              <div className="md:col-span-2 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="birthdayAnniversarySmsConsent"
                  name="birthdayAnniversarySmsConsent"
                  checked={formData.birthdayAnniversarySmsConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-red-500"
                />

                <label
                  htmlFor="birthdayAnniversarySmsConsent"
                  className="text-sm text-gray-600"
                >
                  I give permission to receive birthday and wedding anniversary SMS.
                </label>
              </div>
            </div>
          </section>

          {/* Consent */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
              className="mt-1 w-4 h-4 accent-red-500"
            />

            <label
              htmlFor="consent"
              className="text-sm text-gray-600"
            >
              I confirm that the information provided is
              correct and I consent to the church using this
              information for membership and communication
              purposes.
            </label>
          </div>

          {/* Submit */}
          <div className="border-t pt-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-center rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            ) : (
              <Link
                href="/"
                className="px-6 py-3 text-center rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </Link>
            )}

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-[#78343e] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (editing ? "Saving..." : "Submitting...") : (editing ? "Save Update" : "Submit Registration")}
            </button>
          </div>
        </form>
      </div>}

      {/* Page styles */}
      <style jsx>{`
        .form-label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          outline: none;
          background: white;
          color: #111827;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
        }

        select.form-input {
          accent-color: #ef4444;
        }

        select.form-input option:hover,
        select.form-input option:checked {
          background: #ef4444 linear-gradient(0deg, #ef4444 0%, #ef4444 100%);
          color: white;
        }

        .form-input::placeholder {
          color: #9ca3af;
        }
      `}</style>
      </main>
    </>
  );
}
