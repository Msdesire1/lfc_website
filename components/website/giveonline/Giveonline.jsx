"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';

const Giveonline = () => {
  // separate copied state for each account
  const [copiedStates, setCopiedStates] = useState({
    tithe: false,
    project: false,
    kingdom: false,
      transport: false,
  });

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);

      // update only clicked account
      setCopiedStates((prev) => ({
        ...prev,
        [key]: true,
      }));

      // reset only clicked account
      setTimeout(() => {
        setCopiedStates((prev) => ({
          ...prev,
          [key]: false,
        }));
      }, 2000);
    } catch (error) {
      console.log("Copy failed", error);
    }
  };

  return (
    <div className='w-full bg-white'>
      <section
  className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/mainchrchgive.svg')",
  }}
>

  {/* Top Left Small Preview */}
  <div className="absolute top-2 left-4 z-20">
    <div className="overflow-hidden border border-white/10 shadow-lg">
      <img
        src="/images/giving-bg.jpg"
        alt="preview"
        className="
          object-cover opacity-80 "
      />
    </div>
  </div>

  {/* Main Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-4">
    <div className="max-w-2xl text-center text-white pt-20">
      <h1 className="mb-6 text-[60px] font-bold md:text-[30px">
        Give with Purpose
      </h1>

      <p className="mx-auto mb-8 max-w-xl text-[24px] leading-7 text-gray-200 md:text-base">
       Your giving is an act of worship and a seed of faith. Every seed sown into the Kingdom of God carries a divine harvest. Give generously and expect God&apos;s supernatural multiplication in your life.
      </p>
{/*
      <button className="rounded-[12px] bg-[#AC1E1E] px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
        Give now
      </button> */}
    </div>
  </div>
</section>

  <section className="w-full bg-[#f5f5f5] px-6 py-16 md:px-14 lg:px-20">
      {/* Header */}
      <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-[40px] font-extrabold uppercase text-[#111]">
            Ways To Give
          </h2>
        </div>

        <div className="md:pl-40">
          <p className="max-w-md text-[16px] leading-6 text-gray-700">
            We’ve made giving simple and accessible. Explore the different

          </p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* TITHE */}
        <div>
          <h3 className="mb-4 text-[24px] font-bold uppercase tracking-wide text-[#6C0B0B]">
            Tithe & Offering
          </h3>

          <div className="rounded-2xl bg-[#ececec] px-6 py-10 text-center">
            <p className="mb-4 text-sm text-gray-700">
              Living Faith Church Ilorin
            </p>

            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#111] md:text-5xl">
                1025217761
              </h1>

              <button
                onClick={() =>
                  handleCopy("1025217761", "tithe")
                }
                className="rounded-md p-2 transition hover:bg-gray-200"
              >
                {copiedStates.tithe ? (
                  <span className="text-sm font-semibold text-green-600">
                    Copied
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25h3A2.25 2.25 0 0021 15V7.5A2.25 2.25 0 0018.75 5.25h-7.5A2.25 2.25 0 009 7.5v3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 18.75h7.5A2.25 2.25 0 0015 16.5v-7.5A2.25 2.25 0 0012.75 6.75h-7.5A2.25 2.25 0 003 9v7.5a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              United Bank for Africa
            </p>
          </div>
        </div>

        {/* PROJECT */}
        <div>
          <h3 className="mb-4 text-[24px] font-bold uppercase tracking-wide text-[#6C0B0B]">
            Project Seed
          </h3>

          <div className="rounded-2xl bg-[#ececec] px-6 py-10 text-center">
            <p className="mb-4 text-sm text-gray-700">
              LFC Ilorin PROJECT ACCOUNT
            </p>

            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#111] md:text-5xl">
                1227870144
              </h1>

              <button
                onClick={() =>
                  handleCopy("1227870144", "project")
                }
                className="rounded-md p-2 transition hover:bg-gray-200"
              >
                {copiedStates.project ? (
                  <span className="text-sm font-semibold text-green-600">
                    Copied
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25h3A2.25 2.25 0 0021 15V7.5A2.25 2.25 0 0018.75 5.25h-7.5A2.25 2.25 0 009 7.5v3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 18.75h7.5A2.25 2.25 0 0015 16.5v-7.5A2.25 2.25 0 0012.75 6.75h-7.5A2.25 2.25 0 003 9v7.5a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              ZENITH Bank (ZENITH)
            </p>
          </div>
        </div>
      </div>


 {/* Top Cards */}
      <div className="grid gap-8 md:grid-cols-2 mt-10">
      {/* Bottom Card */}
      <div className="">
        <h3 className="mb-4 text-[24px] font-bold uppercase tracking-wide text-[#6C0B0B]">
          Kingdom Convenant Seed
        </h3>

        <div className="rounded-2xl bg-[#ececec] px-6 py-10 text-center">
          <p className="mb-4 text-sm text-gray-700">
            LFC Ilorin KINDGDON CONVENANT CARE
          </p>

          <div className="flex items-center justify-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#111] md:text-5xl">
              1311789303
            </h1>

            <button
              onClick={() =>
                handleCopy("1311789303", "kingdom")
              }
              className="rounded-md p-2 transition hover:bg-gray-200"
            >
              {copiedStates.kingdom ? (
                <span className="text-sm font-semibold text-green-600">
                  Copied
                </span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25h3A2.25 2.25 0 0021 15V7.5A2.25 2.25 0 0018.75 5.25h-7.5A2.25 2.25 0 009 7.5v3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 18.75h7.5A2.25 2.25 0 0015 16.5v-7.5A2.25 2.25 0 0012.75 6.75h-7.5A2.25 2.25 0 003 9v7.5a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              )}
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-700">
            ZENITH Bank (ZENITH)
          </p>
        </div>
      </div>
        {/* transport*/}
        <div>
          <h3 className="mb-4 text-[24px] font-bold uppercase tracking-wide text-[#6C0B0B]">
            Transport Seed
          </h3>

          <div className="rounded-2xl bg-[#ececec] px-6 py-10 text-center">
            <p className="mb-4 text-sm text-gray-700">
              LFC Ilorin TRANSPORT SEED
            </p>

            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#111] md:text-5xl">
                1227870144
              </h1>

              <button
                onClick={() =>
                  handleCopy("1227870144", "transport")
                }
                className="rounded-md p-2 transition hover:bg-gray-200"
              >
                {copiedStates.transport ? (
                  <span className="text-sm font-semibold text-green-600">
                    Copied
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25h3A2.25 2.25 0 0021 15V7.5A2.25 2.25 0 0018.75 5.25h-7.5A2.25 2.25 0 009 7.5v3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 18.75h7.5A2.25 2.25 0 0015 16.5v-7.5A2.25 2.25 0 0012.75 6.75h-7.5A2.25 2.25 0 003 9v7.5a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              ZENITH Bank (ZENITH)
            </p>
          </div>
        </div>
      </div>


    </section>
    </div>
  )
}

export default Giveonline