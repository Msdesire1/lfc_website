"use client";
import React from 'react'
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Footer from '../Footer';

const faqData = [
  {
    question: "How do i find lfc NEW JERUSALEM ILORIN?",
    answer:
      "Located at Gaa-imam beside ITC company.",
  },
  {
    question: "How do i book a session?",
    answer:
      "Select your preferred tutor, choose an available time slot, and confirm your booking directly from the tutor profile.",
  },
  {
    question: "What if i need to cancel or reschedule a session?",
    answer:
      "You can cancel or reschedule sessions from your dashboard before the scheduled session time.",
  },
  {
    question: "How do I pay for sessions?",
    answer:
      "Payments can be made securely online using your debit card, bank transfer, or other supported payment methods.",
  },
  {
    question: "What should I do if my tutor doesn't show up?",
    answer:
      "Please contact support immediately and we will assist you with rescheduling or issuing a refund if necessary.",
  },
  {
    question: "How do I leave feedback for my tutor?",
    answer:
      "After every completed session, you can leave a rating and feedback from your dashboard.",
  },
];


const Contact = () => {
   const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div>
   <section
  className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/mainchurchus.svg')",
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
      <h1 className="mb-3 text-[60px] font-bold md:text-[30px">
    We&apos;re here for you!
      </h1>
      <p className="mx-auto mb-8 max-w-xl text-[24px] leading-7 text-gray-200 md:text-base">
      If you would like to talk to us, please call us at +2347080638000 <br/> or send an email to lfcwwilr@yahoo.com or
Kwara.state@lfcww.org
      </p>
    </div>
  </div>
</section>
{/* 2 */}

  <section
      className="w-full bg-cover bg-center bg-no-repeat py-16 px-4 md:px-10 lg:px-20"
    >

      <div className="relative z-10  grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-4"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-[15px] md:text-base text-gray-800 font-medium">
                    {faq.question}
                  </span>

                  {activeIndex === index ? (
                    <Minus className="w-4 h-4 text-black" />
                  ) : (
                    <Plus className="w-4 h-4 text-black" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index
                      ? "max-h-40 opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-500 leading-6 max-w-md">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#F5F5F5] rounded-2xl shadow-md  md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold text-black mb-2">
            Still have more questions? Contact Us
          </h3>

          <p className="text-sm text-gray-500 mb-8">
            Fill out the form below and we will respond as soon as we can.
          </p>

          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Adeyemo Adesire"
                className="w-full h-11 border border-gray-300 rounded-md px-4 outline-none focus:border-red-600"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="lfcwebsite@gmeenramy.com"
                  className="w-full h-11 border border-gray-300 rounded-md px-4 outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="+234 708 063 8000"
                  className="w-full h-11 border border-gray-300 rounded-md px-4 outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Subject
              </label>

              <textarea
                rows={3}
                  placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-md px-4  outline-none resize-none focus:border-red-600"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#AC1E1E] hover:bg-red-800 transition-all duration-300 text-white font-medium py-3 rounded-[12px]"
            >
              Submit now
            </button>
          </form>
        </div>
      </div>
    </section>
{/* 3 */}
  <section className='py-16 px-4 md:px-10'>
 <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
       <iframe
        src="https://maps.google.com/maps?q=Gaa%20Imam%20Ilorin%20Kwara&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
      />
    </div>
  </section>
<div className='lg:pt-10'>
{/* <Footer /> */}
</div>

    </div>
  )
}

export default Contact