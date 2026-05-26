
"use client";
import Image from 'next/image';
import React from 'react'

const Landmark  = () => {

const programmes = [
    "Software Engineering",
    "Cyber Security",
    "Artificial Intelligence",
    "Telecommunication Sciences",
    "Medical Laboratory Sciences",
    "Public Health",
    "Nursing",
    "Criminology and Security Studies",
    "Psychology",
  ];

  return (
    <div>
        <section className="relative h-screen overflow-hidden">
 {/* Background Video */}
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://www.youtube.com/embed/bbwyBJk7KhY?autoplay=1&mute=1&loop=1&playlist=bbwyBJk7KhY&controls=0&showinfo=0&modestbranding=1"
        title="Hero Video"
        frameBorder="0"
        allow="autoplay; fullscreen"
      ></iframe>
      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
        <div>
          <p className="mt-4 text-lg md:text-2xl">
           Welcome To  Landmark University
          </p>
        </div>
      </div>
    </section>
    {/* 2 */}
    {/* COURSES MARQUEE */}
<section className="relative -mt-14 z-30">
  <div className="w-full mx-auto ">
    <div className="bg-[#89C9D5] text-white  py-6 overflow-hidden ">
      <div className="flex items-center gap-6 whitespace-nowrap marquee">
        {[
          "Accounting",
          "Banking & Finance",
          "Business Administration",
          "Economics",
          "International Relations",
          "Political Science",
          "Sociology",
          "Agricultural Economics",
          "Agricultural Extension",
          "Animal Science",
          "Crop Science",
          "Soil Science",
          "Food Science & Nutrition",
          "Biochemistry",
          "Microbiology",
          "Industrial Chemistry",
          "Physics",
          "Mathematics",
          "Computer Science",
          "Software Engineering",
          "Cyber Security",
          "Artificial Intelligence",
          "Agricultural Engineering",
          "Chemical Engineering",
          "Civil Engineering",
          "Electrical Engineering",
          "Mechanical Engineering",
          "Telecommunication Science",
          "Public Health",
          "Nursing",
          "Medical Laboratory Science",
          "Criminology",
          "Psychology",
        ]
          .concat([
            "Accounting",
            "Banking & Finance",
            "Business Administration",
            "Economics",
            "International Relations",
            "Political Science",
            "Sociology",
            "Agricultural Economics",
            "Agricultural Extension",
            "Animal Science",
            "Crop Science",
            "Soil Science",
            "Food Science & Nutrition",
            "Biochemistry",
            "Microbiology",
            "Industrial Chemistry",
            "Physics",
            "Mathematics",
            "Computer Science",
            "Software Engineering",
            "Cyber Security",
            "Artificial Intelligence",
            "Agricultural Engineering",
            "Chemical Engineering",
            "Civil Engineering",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Telecommunication Science",
            "Public Health",
            "Nursing",
            "Medical Laboratory Science",
            "Criminology",
            "Psychology",
          ])
          .map((course, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6"
            >

              <div className="h-10 w-10 rounded-full bg-white justify-center items-center flex">
            <Image src="/logomark.png" alt="Logo" width={35} height={40} />
            </div>

              <h3 className="text-gray-800 font-semibold text-lg">
                {course}
              </h3>
            </div>
          ))}
      </div>
    </div>
  </div>
</section>
{/* 3 */}

<section
        id="about"
        className="max-w-7xl mx-auto px-6 lg:px-20 py-24"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div className="relative">
            <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/gate.jpeg"
                alt="LMU Agrarian Revolution"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -right-8 bg-[#AC5E00] text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-4xl font-bold">2011</h3>
              <p className="font-medium">University Established</p>
            </div>
          </div>




            {/* CONTENT */}
          <div>
            <p className="uppercase tracking-[2px] text-yellow-600 font-semibold mb-4">
              About Landmark University
            </p>

            <h2 className="text-[16px] lg:text-[20px] font-bold text-gray-900 leading-tight">
              Raising A New Generation Of Solution Providers
            </h2>

            <p className="mt-8 text-gray-600 leading-8">
              Landmark University is a private University established by the
              Living Faith Church Worldwide, committed to raising leaders who
              shall be equipped with skills and character to lead the world in
              meeting the needs of humanity through innovative education and
              agricultural transformation.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              The University is focused on assisting Africa in rediscovering
              her leadership role through qualitative education, groundbreaking
              research, and practical solutions to societal challenges.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition">
                <h4 className="font-bold text-xl mb-3">
                  Agrarian Revolution
                </h4>

                <p className="text-gray-600 text-sm leading-7">
                  Committed to transforming agriculture through innovation,
                  technology, and practical education.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition">
                <h4 className="font-bold text-xl mb-3">
                  Global Excellence
                </h4>

                <p className="text-gray-600 text-sm leading-7">
                  Building students with leadership capacity, excellence, and
                  global relevance.
                </p>
              </div>
            </div>
           </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-20 text-center">
          <p className="uppercase tracking-[2px] text-yellow-600 font-semibold mb-3">
            Ready to take the next step?
          </p>
          <h3 className=" font-bold text-gray-900 text-[16px] lg:text-[30px]">
            Apply through the official Landmark University website
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 leading-8">
            Landmark University offers admission support, programme details, and the full application process on its main site. Click below to begin your application and learn more about entry requirements, fees, and deadlines.
          </p>
          <a
            href="https://lmu.edu.ng"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center mt-8 rounded-full bg-[#AC5E00] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#8e4a00]"
          >
            Apply Now on LMU
          </a>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="py-24 text-black bg-[#F5F5F5] mb-20 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="uppercase tracking-[5px] text-yellow-400 mb-4">
              Watch Out
            </p>

            <h2 className="text-[16px] lg:text-[30px] font-bold">
              New Programmes Coming Soon
            </h2>

            <p className="text-black mt-3 leading-4">
              Expanding opportunities through innovative and future-driven
              academic programmes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 ">
            {programmes.map((programme, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-yellow-500 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6">
                  <span className="text-yellow-400 text-[14px]">★</span>
                </div>

                <h3 className="text-xl font-semibold leading-10">
                  {programme}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landmark