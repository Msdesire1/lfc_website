"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const Faithacademy = () => {
  const slides = [
    {
      id: 1,
      image: "/faithv.avif",
      text: "Welcome to Faith Academy",
      subText: "Building Leaders for Tomorrow",
    },
    {
      id: 2,
      image: "/faithff.jpg",
      text: "Excellence in Education",
      subText: "Nurturing Minds, Strengthening Faith",
    },
    {
      id: 3,
      image: "/faithf.jpg",
      text: "Christ-Centered Learning",
      subText: "Inspiring Students to Reach Their Potential",
    },
    {
      id: 4,
      image: "/faithii.jpg",
      text: "Holistic Development",
      subText: "Academics, Character, and Spiritual Growth",
    },
    {
      id: 5,
      image: "/faithiii.jpg",
      text: "Your Child's Future Starts Here",
      subText: "Join Our Growing Community",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // const nextSlide = () => {
  //   setCurrent((prev) => (prev + 1) % slides.length)
  // }

  // const prevSlide = () => {
  //   setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  // }

  return (
    <div>
      {/* Hero Slider Section */}
      <section className="w-full py-8 px-4 md:px-10 lg:px-20 ">
        <div className="relative w-full top-10  overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative min-w-full h-[350px] sm:h-[400px] md:h-[600px] rounded-3xl"
              >
                <img
                  src={slide.image}
                  alt={slide.text}
                  className="w-full h-full object-cover "
                />

                {/* Center Text Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 bg-black/30">
                  <h1 className="text-white text-2xl md:text-5xl font-bold mb-4">
                    {slide.text}
                  </h1>
                  <p className="text-white text-sm md:text-lg max-w-2xl">
                    {slide.subText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === index ? "bg-red-500 scale-110" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About School Section */}
      <section className="py-16 px-4 md:px-10 lg:px-20 bg-gray-50">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
              About Faith Academy
            </h2>
            <p className="text-[16px] text-gray-700 leading-relaxed mb-4">
              Faith Academy is a Christian secondary school located in the
              Ita-Alamu area along Ajasse-Ipo Road, Ilorin, Kwara State,
              Nigeria. The school is part of the Faith Academy Network
              established by God Servant David Oyedepo under Living Faith Church
              Worldwide. Faith Academy is known for combining academic
              excellence with strong spiritual and moral training, helping
              students grow intellectually, socially, and spiritually. The
              school operates as a co-educational institution and provides
              quality education for both junior and senior secondary students.
              Its vision focuses on raising disciplined and God-fearing leaders
              through sound teaching, character development, leadership
              training, and creative learning activities.
            </p>
            <p className="text-[16px] text-gray-700 leading-relaxed">
              We believe that true education encompasses the development of the
              mind, body, and spirit. Our comprehensive curriculum, combined
              with a nurturing environment, ensures that every student reaches
              their full potential.
            </p>
          </div>

          {/* School Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-red-500 mb-4">
                Academic Excellence
              </h3>
              <p className="text-gray-700 text-[14px]">
                Our rigorous academic programs are designed to challenge and
                inspire students to achieve their best. With experienced
                educators and modern facilities, we ensure excellence in every
                subject.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-red-500 mb-4">
                Spiritual Growth
              </h3>
            <p className="text-gray-700 text-[14px]">
                We integrate faith-based teachings throughout our curriculum,
                helping students develop a strong spiritual foundation and moral
                character based on Christian principles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-red-500 mb-4">
                Holistic Development
              </h3>
             <p className="text-gray-700 text-[14px]">
                Beyond academics, we encourage participation in sports, arts,
                and extracurricular activities to develop well-rounded
                individuals with diverse talents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-red-500 mb-4">
                Modern Facilities
              </h3>
             <p className="text-gray-700 text-[14px]">
                Our state-of-the-art facilities include well-equipped
                classrooms, science laboratories, computer labs, sports grounds,
                and a library to support comprehensive learning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-red-500 mb-4">
                Experienced Faculty
              </h3>
           <p className="text-gray-700 text-[14px]">
                Our dedicated team of qualified educators brings years of
                experience and passion for teaching. They are committed to
                mentoring students for academic and personal success.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-red-500 mb-4">
                Community & Support
              </h3>
             <p className="text-gray-700 text-[14px]">
                We foster a supportive community where students feel valued and
                encouraged. Strong parent-teacher partnerships ensure every
                child receives the attention they deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-16 px-4 md:px-10 lg:px-20 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image on Left */}
            <div className="w-full lg:w-1/2">
              <img
                src="/faithi.jpg"
                alt="Parent Registration"
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Text Content on Right */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-[30px]  font-bold text-gray-900 mb-6">
                Enroll Your Child Today
              </h2>

              <p className="text-[14px] text-gray-700 leading-relaxed mb-6">
                Faith Academy welcomes families who share our vision of
                providing quality Christian education. Our registration process
                is simple and designed to ensure your child finds the perfect
                fit within our community.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-gray-900 mb-2">
                      Submit Application
                    </h3>
                    <p className="text-gray-700">
                      Complete the registration form with your childs
                      information and parental details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-gray-900 mb-2">
                      Assessment & Interview
                    </h3>
                    <p className="text-gray-700 text-[14px]">
                      Your child will participate in an assessment while we get
                      to know your family better.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Acceptance & Enrollment
                    </h3>
                  <p className="text-gray-700 text-[14px]">
                      Upon acceptance, complete the enrollment process and
                      prepare for a life-changing experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F5F5] border-l-4 border-[#EC3237] p-6 mb-8 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">
                  📋 Required Documents:
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Birth Certificate (certified copy)</li>
                  <li>• Report Cards from Previous School</li>
                  <li>• Immunization Records</li>
                  <li>• Parent/Guardian ID and Contact Information</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/website/contact"
                  className="bg-red-500 text-white px-8 py-3 rounded-[12px] font-semibold hover:bg-red-600 transition-all text-center"
                >
                  Start Registration
                </Link>
                <button className="border-2  border-red-500 text-red-500 px-8 py-3 rounded-[12px] font-semibold hover:bg-red-50 transition-all">
                  Download Forms
                </button>
              </div>

              <p className="text-gray-600 text-sm mt-6">
                Have questions? Contact our admissions team at{" "}
                <span className="font-semibold">
                  admissions@faithacademy.com
                </span>{" "}
                or call us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 px-4 md:px-10 lg:px-20 bg-gray-50">
        {/* Call to Action */}
        <div className="bg-red-500 text-white rounded-lg p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Join Faith Academy?
          </h3>
          <p className="text-[16px] mb-8">
            Take the first step toward an excellent Christian education. Enroll
            your child today and watch them thrive.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/website/contact"
              className="bg-white text-red-500 px-8 py-3 rounded-[12px] font-semibold hover:bg-gray-100 transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="https://www.facebook.com/groups/1554757071283257/"
              className="border-2 border-white text-white px-8 py-3 rounded-[12px] font-semibold hover:bg-red-600 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faithacademy;
