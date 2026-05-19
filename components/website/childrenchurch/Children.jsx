import React from 'react'
import Hero from '../Reuseable/Hero'
import Image from 'next/image'

const Children = () => {
  return (
   <div>
      <div className="pb-12 mt-36 px-4 md:px-10 flex items-center gap-12 justify-between lg:px-16">
          <div className='flex flex-col gap-[24px]'>
            <h2 className='text-[60px] font-semibold text-[#000000]'  >
    Growing in Faith, Finding Your Voice
            </h2>
            <span className='text-[24px] font-normal w-[723px] text-[#121212]'>
    A supportive space where teens can explore their faith, build confidence, and navigate life with guidance and truth.
            </span>
          </div>

          <Image width={660} height={486} src="/childone.svg" alt="mandate" className='object-cover' />
        </div>
    {/*  */}
    <section className="w-full bg-[#F5F5F5] px-6 py-20 ">
      <div className="mx-auto max-w-7xl">

        {/* Top Content */}
        <div className="relative z-10 mx-auto max-w-2xl px-8 py-10 text-center  md:px-14">
          <h2 className="mb-6 text-3xl font-bold text-[#111111] md:text-4xl ">
            About This Ministry
          </h2>

          <p className="text-base leading-9 text-gray-700 md:text-lg">
            This ministry is designed to support children and teens at
            every stage of their growth. Through age-appropriate
            teaching, guidance, and engaging activities, we help them
            build a strong foundation in faith while developing confidence
            and values for life.
          </p>
        </div>

        {/* Image Section */}
        <div className="-mt-44 overflow-hidden rounded-[30px]">
          <img
            src="/childtwo.svg"
            alt="Ministry Members"
            className="h-[350px] w-full object-cover md:h-[500px]"
          />
        </div>
      </div>
    </section>
    {/*  */}
    <section className="w-full  px-6 py-20 ">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

        {/* Left Image */}
        <div className="overflow-hidden rounded-[24px]">
          <img
            src="/childthree.svg"
            alt="Church Worship Service"
            className="h-[450px] w-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="mb-5 text-[40px] font-bold text-[#111111] md:text-4xl">
            Join Us to Worship
          </h2>

          <p className="mb-5 max-w-xl text-base leading-8 text-gray-600">
            Be part of our Sunday service where teens gather to worship,
            learn, and grow in a supportive faith community.
          </p>

          {/* Service Time */}
          <div>
            <h3 className="mb-3 text-2xl font-semibold text-[#111111]">
              Service Time:
            </h3>

            <div className="space-y-3 text-sm leading-7 text-gray-700 md:text-base">
              <p>
                Word Encounter Service (Every Sunday) - 7:30am
              </p>

              <p>
                Midweek Communion Service (Every Wednesday) - 5:00pm
              </p>

              <p>
                Monday - Friday - COVENANT HOUR OF PRAYER - 6:30AM
              </p>

              <p>
                Trumpet Service (First day of the month) - 6:30am
              </p>

              <p>
                Leadership Empowerment Summit (First Saturday of the month)
                - 7:00am
              </p>

              <p>
                Week of Spiritual Emphasis (First Wednesday-Friday of the
                month) - 5:00pm
              </p>
            </div>

            {/* Map Link */}
            <div className="mt-4">
              <a
                href="/website/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-6-5.686-6-11a6 6 0 1112 0c0 5.314-6 11-6 11z"
                  />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                Find us on the map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
  )
}

export default Children