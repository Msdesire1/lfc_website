
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function JoinUsPage({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    address: "",
    membershipStatus: "",
    wsfLocation: "",
    serviceUnit: "",
    previousChurch: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    additionalInformation: "",
    consent: false,
  });

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

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      /*
       * API connection will go here.
       *
       * Example:
       *
       * const response = await fetch("/api/members/register", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify(formData),
       * });
       *
       * const data = await response.json();
       *
       * if (!response.ok) {
       *   throw new Error(data.message);
       * }
       */

      // Temporary simulation
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setSuccess(
        "Thank you! Your information has been submitted successfully."
      );

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        address: "",
        membershipStatus: "",
        wsfLocation: "",
        serviceUnit: "",
        previousChurch: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        additionalInformation: "",
        consent: false,
      });
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
        ? "fixed inset-4 z-[1101] mx-auto max-w-4xl overflow-y-auto rounded-2xl bg-[#f7f7f7] px-4 pb-10 pt-8 shadow-2xl sm:inset-8 md:inset-y-6"
        : "min-h-screen bg-[#f7f7f7] pt-24 pb-16"}
      >
      {onClose && (
        <div className="mx-auto mb-6 flex max-w-4xl items-center justify-between">
          <Image
            src="/logo.svg"
            alt="Living Faith Church New Jerusalem logo"
            width={50}
            height={48}
            priority
          />
          <button
            type="button"
            aria-label="Close join us form"
            onClick={onClose}
            className="rounded-full bg-white p-2 text-gray-700 shadow transition hover:bg-gray-100"
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
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <p className="text-red-500 text-sm font-semibold uppercase tracking-wider">
          LFC New Jerusalem, Ilorin
        </p>

        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
          Join Us
        </h1>

        <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
          Welcome to Living Faith Church New Jerusalem.
          Please fill out the form below with your details
          so we can get to know you and connect with you.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Card Header */}
        <div className="bg-red-500 px-6 md:px-8 py-6 text-white">
          <h2 className="text-xl md:text-2xl font-bold">
            Church Member Registration
          </h2>

          <p className="mt-1 text-sm text-white/80">
            Kindly provide accurate information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 md:p-8 space-y-8"
        >
          {/* Success */}
          {success && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
              {success}
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
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="form-input"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="form-label">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
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
                  Marital Status
                </label>

                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
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

              {/* Address */}
              <div className="md:col-span-2">
                <label className="form-label">
                  Residential Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your residential address"
                  className="form-input resize-none"
                />
              </div>
            </div>
          </section>

          {/* Church Information */}
          <section className="border-t pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Church Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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

                  <option value="First Timer">
                    First Timer
                  </option>

                  <option value="Returning Member">
                    Returning Member
                  </option>
                </select>
              </div>

              {/* WSF */}
              <div>
                <label className="form-label">
                  WSF Location
                </label>

                <input
                  type="text"
                  name="wsfLocation"
                  value={formData.wsfLocation}
                  onChange={handleChange}
                  placeholder="Enter your WSF location"
                  className="form-input"
                />
              </div>

              {/* Service Unit */}
              <div>
                <label className="form-label">
                  Service Unit
                </label>

                <select
                  name="serviceUnit"
                  value={formData.serviceUnit}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">
                    Select service unit
                  </option>

                  <option value="Protocol">
                    Protocol
                  </option>

                  <option value="Choir">
                    Choir
                  </option>

                  <option value="Sanctuary">
                    Sanctuary
                  </option>

                  <option value="Technical">
                    Technical
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

                  <option value="Media">
                    Media
                  </option>

                  <option value="None">
                    None
                  </option>
                </select>
              </div>

              {/* Previous Church */}
              <div>
                <label className="form-label">
                  Previous Church
                </label>

                <input
                  type="text"
                  name="previousChurch"
                  value={formData.previousChurch}
                  onChange={handleChange}
                  placeholder="Name of previous church"
                  className="form-input"
                />
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="border-t pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="form-label">
                  Contact Name
                </label>

                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">
                  Contact Phone
                </label>

                <input
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="08012345678"
                  className="form-input"
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="border-t pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Additional Information
            </h3>

            <textarea
              name="additionalInformation"
              value={formData.additionalInformation}
              onChange={handleChange}
              rows="4"
              placeholder="Enter any additional information..."
              className="form-input resize-none"
            />
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
          <div className="border-t pt-6 flex flex-col sm:flex-row gap-3 justify-end">
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
              {loading
                ? "Submitting..."
                : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>

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
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          background: white;
          color: #111827;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.15);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }
      `}</style>
      </main>
    </>
  );
}
