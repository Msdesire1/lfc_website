"use client";
import React from 'react'
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
// import Footer from '../Footer';

const faqData = [
  {
    question: "Where is LFC New Jerusalem Ilorin located?",
    answer: "We are at Gaa-Imam, beside the ITC Company, Ilorin, Kwara State.",
  },
  {
    question: "When are your main worship services?",
    answer: "Sundays: 7:30 AM (Family Service) and 9:30 AM. Midweek service: Wednesdays at 50:00PM -6:30PM.",
  },
  {
    question: "How can I give or support the church?",
    answer: "You can give online via our website, drop offerings during services, or contact the office for bank transfer details.",
  },
  {
    question: "How do I contact the church office?",
    answer: "Call +234 811 078 2906 or +234 816 160 8839, or email lfcwwilr@yahoo.com.",
  },
  {
    question: "Do you have children's and youth programs?",
    answer: "Yes — we run Children's Church and Youth Fellowship during Sunday services and weekly midweek meetings.",
  },
  {
    question: "How do I join a  WSF?",
    answer: "Visit the Welcome Desk after service or email Kwara.state@lfcww.org to be connected to a ministry leader.",
  },
];


const Contact = () => {
   const [activeIndex, setActiveIndex] = useState(0);
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     subject: "",
     message: "",
   });
   const [isSending, setIsSending] = useState(false);
   const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xreveraz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: "New contact form submission",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Unable to send message. Please try again later.");
      }

      setToast({ visible: true, message: "Message sent successfully. Thank you!", type: "success" });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setToast({
        visible: true,
        message: error.message || "Send failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSending(false);
      window.setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000);
    }
  };

  return (
    <div>
      {toast.visible && (
        <div className={`fixed right-4 top-4 z-50 rounded-2xl px-4 py-3 text-sm shadow-xl transition-all duration-300 ${toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.message}
        </div>
      )}
   <section
  className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/mainchurchus.svg')",
  }}
>


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
      <h1 className="mb-3 text-[30px] font-bold md:text-[60px]">
    We&apos;re here for you!
      </h1>
      <p className="mx-auto mb-8 max-w-xl text-[24px] leading-7 text-gray-200 md:text-base">
      If you would like to talk to us,<br/>  please call us at +234 811 078 2906 and +234 816 160 8839 <br/> or send an email to lfcwwilr@yahoo.com or
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

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234 816 160 8839"
                  className="w-full h-11 border border-gray-300 rounded-md px-4 outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Subject
              </label>

              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Subject (brief)"
                className="w-full h-11 border border-gray-300 rounded-md px-4 outline-none focus:border-red-600"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Message
              </label>

              <textarea
                rows={10}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-md px-4 outline-none resize-none focus:border-red-600"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#AC1E1E] hover:bg-red-800 transition-all duration-300 text-white font-medium py-3 rounded-[12px] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSending ? "Sending..." : "Submit now"}
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
</div>

    </div>
  )
}

export default Contact
