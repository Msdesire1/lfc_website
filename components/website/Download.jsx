import React from 'react'

const Download = () => {
  return (
  <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-20">
    <h2 className="text-[30px] font-semibold  text-[#121212]  text-center justify-centefull">
                   Discover inspiring messages
                </h2>
  <div className="mx-auto grid max-w-7xl grid-cols-1 pt-10 items-center gap-10 lg:grid-cols-2">

    {/* Left Side Image */}
    <div className="relative overflow-hidden rounded-3xl">
      <img
        src="/bookshop.jpg"
        alt="Section Image"
        className="lg:h-full w-full object-cover"
      />
    </div>

    {/* Right Side Content */}
    <div className="w-full">

      {/* Card 1 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src="/bbb.jpg"
            alt="Card"
            className="h-[460px]  full object-obtain  hover:scale-105 transition duration-500"
          />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          Download Inspiring Messages
        </h3>

        <p className="mb-5 text-[14px] leading-6 text-gray-600">
        Explore a rich collection of anointed messages from God’s servants, filled with wisdom, revelation, and spiritual growth. Stream or download powerful sermons, faith-building teachings, and life-changing books anytime, anywhere  designed to strengthen your walk with God and inspire your daily life.
 landmark
        </p>

        <a
          href="https://drive.google.com/drive/folders/1TCE1nGUM6UcibMTN4iGmnyVioHloqQ3c"
          download
          className="inline-flex items-center rounded-[12px] bg-[#EC3237] px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-[#EC3237]"
        >
          Download Now
        </a>
      </div>

    </div>
  </div>
</section>
  )
}

export default Download