"use client"

import Image from 'next/image'
import React from 'react'
import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const courses = [
  {
    id: 1,
    tag: "SPECIALISED COURSE",
    title: "3-Day Specialized WOFBI",
    description:
      "To lay a solid foundation in the word of God for students and to provoke their understanding.",
    button: "Coming Soon",
    image: "/step-one.png",
  },
  {
    id: 2,
    tag: "BEGINNER COURSE",
    title: "Basic Certificate Course",
    description:
      "To lay a solid foundation in the word of God for students and to provoke their understanding.",
    button: "Start Course",
    image: "/step-two.png",
  },
  {
    id: 3,
    tag: "INTERMIDIATE COURSE",
    title: "Leadership Certificate Course",
    description:
      "Deepen your biblical knowledge with advanced theological concepts and applications.",
    button: "Coming Soon",
    image: "/step-three.png",
  },
  {
    id: 4,
    tag: "ADVANCED COURSE",
    title: "Leadership Diploma Course",
    description:
      "To lay a solid foundation in the word of God for students and to provoke their understanding.",
    button: "Coming Soon",
    image: "/step-one.png",
  },
];

const Wofbi = () => {
    const [openIndex, setOpenIndex] = useState(0);

     const faqs = [
    {
      question: "How do i find a tutor?",
      answer:
        'Use the search bar and filters on the "Find a Tutor" page to search for tutors by subject, availability, rating, and more.',
    },
    {
      question: "How do I book a session?",
      answer:
        "Choose your preferred tutor, select an available time slot, and confirm your booking through the platform.",
    },
    {
      question: "What if I need to cancel or reschedule a session?",
      answer:
        "You can cancel or reschedule your session from your dashboard before the scheduled time.",
    },
    {
      question: "How do I pay for sessions?",
      answer:
        "Payments can be made securely using debit cards, bank transfers, or other supported payment methods.",
    },
    {
      question: "What should I do if my tutor doesn't show up?",
      answer:
        "Please contact support immediately and we’ll help resolve the issue or reschedule your session.",
    },
    {
      question: "How do I leave feedback for my tutor?",
      answer:
        "After each completed session, you can leave ratings and feedback directly on the tutor’s profile.",
    },
  ];

  const toggleFaq = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (

    <div className='lg:px-20 px-6'>
{/* 1 */}
<section className="w-full ">
 <div className="pb-12 mt-36 px-6 lg:flex-row flex-col  flex items-center gap-12 justify-between ">
      <div className='flex flex-col   gap-[24px]'>
        <h2 className='text-[40px] font-semibold text-[#000000]'  >
Word of Faith Bible <br/> Institute (WOFBI)
        </h2>
        <span className='text-[16px] font-normal  text-[#121212]'>
It takes training to triumph and no one arms a man who
{/* <br/> */}
 is not trained. That is what WOFBI stands for, and
{/* <br/> */}
 hence our Motto is:
 {/* <br /> */}
&quot;&quot;To Train and Raise Men and Women for Exploits&quot;&quot;
        </span>

        <div>
          <button className='px-8 py-3 bg-[#EC3237] text-white rounded-[12px] text-[16px] font-medium'>
           Register
          </button>
        </div>
      </div>

      <Image width={500} height={486} src="/wobi.svg" alt="mandate" className='object-cover rounded-[32px]' />
    </div>
</section>

{/*  */}

 <section className="w-full py-20 px-6 ">
      <div className="">
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-[#d62d20]" />
            <p className="text-sm font-semibold uppercase tracking-[3px] text-[#d62d20]">
              Available Courses
            </p>
            <span className="h-[1px] w-12 bg-[#d62d20]" />
          </div>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-black md:text-4xl">
            Unlock Your Spiritual Potentials
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#555]">
            Word of Faith Bible Institute is a spiritual training school where
            kingdom soldiers are trained and made.
          </p>
        </div>

        {/* COURSES GRID */}
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group rounded-[24px] bg-[#f1efed] p-8 text-center transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* TAG */}
              <div className="mb-10 inline-block rounded-full bg-[#e5e2df] px-6 py-3">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#4b5563]">
                  {course.tag}
                </p>
              </div>

              {/* IMAGE */}
              <div className="mb-8 flex justify-center">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={180}
                  height={180}
                  className="object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* TITLE */}
              <h3 className="mb-5 text-[12px] font-semibold leading-snug text-[#c61f16]">
                {course.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mb-8 text-[14px] leading-5 text-[#555]">
                {course.description}
              </p>

              {/* BUTTON */}
              <button className="rounded-[12px] border border-[#d9a24a] px-8 py-4 text-[14px] font-medium text-[#555] transition duration-300 hover:bg-[#d9a24a] hover:text-white">
                {course.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
{/* 3 */}
 <section className="w-full bg-[#B91C1C] px-6 py-24  rounded-[12px]">
      <div className="mx-auto max-w-5xl text-center text-white">

        {/* TOP TITLE */}
        <h4 className="mb-10 font-serif text-[40px] font-bold tracking-wide md:text-[60px">
          The Institute
        </h4>

        {/* MAIN CONTENT */}
        <h2 className="mx-auto  lg:text-[30px] font-semibold leading-[1.6] md:text-5xl md:leading-[1.5]">
          The Word of Faith Bible Institute is the training arm of the Living
          Faith Church Worldwide. It was established on September 1, 1986,
          fulfillment of the mandate God gave his Servant, Bishop David Oyedepo
          who is the President of the institute, and on May 11, 1983, God told
          him:
        </h2>

        {/* QUOTE */}
        <div className="mt-16">
          <p className="mx-auto  lg:text-[20px] text-[14px] leading-10 text-[#f3d7d7] md:text-2xl">
            &quot;I will through this ministry raise the foundations of many other
            ministries.&quot;
          </p>
        </div>
      </div>
    </section>
    {/* 4 */}
  <section className="w-full  py-16 px-4 ">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Image */}
        <div className="w-full">
          <div className="relative w-full h-[260px] md:h-[350px] rounded-lg overflow-hidden">
            <Image
              src="/ourv.svg" // put your image inside public folder
              alt="Our Vision"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-6">

          {/* Small Heading */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#EC3237]"></span>
            <p className="text-[#EC3237] text-sm font-medium tracking-wide">
              What we do
            </p>
            <span className="w-10 h-[1px] bg-[#EC3237]"></span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900">
            Our Vision
          </h2>

          {/* Paragraph */}
          <p className="text-gray-700 leading-9 text-[16px] max-w-xl">
            The Vision of the Institute is in line with the mandate of the
            Living Faith Church Worldwide as given to is servant Bishop David
            Oyedepo. For this reason, the Institute&apos;s Curriculum is
            designed to inculcate covenant excellence in leadership, Ministry,
            social, economic and other areas of human endeavor.
          </p>
        </div>
      </div>
    </section>

{/* 5 */}
 <section className="w-full py-16 px-4 ">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Right Content */}
        <div className="space-y-6">

          {/* Small Heading */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#EC3237]"></span>
            <p className="text-[#EC3237] text-sm font-medium tracking-wide">
              What we do
            </p>
            <span className="w-10 h-[1px] bg-[#EC3237]"></span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900">
          Our Primary Goal
          </h2>

          {/* Paragraph */}
          <p className="text-gray-700 leading-9 text-[16px] max-w-xl">
           The anchor scripture given to His servant at the onset of the institute is Genesis 14:14. &quot;And when Abram heard that his brother was taken captive, he armed His trained servants born in his own house, three hundred and eighteen, and pursued them into Dan&quot;..
Our primary goal is to provide God centered spiritual education that engenders enlightenment and mental empowerment for daily exploits. To this end, the Courses offered at the Word of Faith Bible Institute are tailored to reveal God to man and enable him walk in dominion on earth.
          </p>
        </div>


  {/* Left Image */}
        <div className="w-full">
          <div className="relative w-full h-[268px] md:h-[350px] rounded-lg overflow-hidden">
            <Image
              src="/wobiimage.jpg"
              alt="Our Vision"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>

  <section className="w-full bg-[#F5F5F5] py-20 rounded-[12px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div className="space-y-8 px-5">
          <div className="space-y-5">
            <h2 className="text-3xl md:text-3xl font-semibold text-[#111111] leading-tight">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-700 text-[16px] leading-8 max-w-lg">
              It facilitate communication by answering common questions
              and equipping users with essential information.
            </p>
          </div>

          <button className="bg-[#EC3237] hover:bg-red-700 transition-all duration-300 text-white px-8 py-4 rounded-lg font-medium">
            Contact Us
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#FDFDFD] rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[#222222] text-[14px] md:text-base font-medium pr-4">
                    {faq.question}
                  </span>

                  <span className="text-gray-600 flex-shrink-0">
                    {isOpen ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-gray-600 leading-7 text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>


    </div>
  )
}

export default Wofbi