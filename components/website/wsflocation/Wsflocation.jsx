
"use client"
import React from 'react'
import HomeCell from './Homecell'

const Wsflocation = () => {
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
  <h1 className="mb-3 text-[60px] font-bold md:text-[30px]">
      WSF Locations
      </h1>
  <p className="mx-auto mb-8 max-w-xl text-[24px] leading-7 text-gray-200 md:text-base">

    Find any WFS close to your area and come experience the <br/>  love, grace, and truth of God. Your life will never remain the same in His presence.
      </p>
    </div>
  </div>
</section>

  <section className="w-full py-20 px-6 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="mt-6 text-start text-[25px] leading-8 text-[#333333] md:text-lg">

 <span className='text-[#EC3237] '> Winners’ Satellite Fellowship </span> is our small-group system designed to bring the church closer to you. It’s a vibrant and interactive platform where members gather weekly in various neighborhoods to share God’s Word, pray together, grow spiritually, and build lasting relationships.

Whether you’re new in the faith or a long-time believer, the home cell offers a warm, family-like environment where your faith is strengthened and your needs are met through love, care, and fellowship.

Join a cell close to you and experience church as it was in the early days personal, powerful, and full of God’s presence.<br/>
        </p>
      </div>
</section>

<section className='py-20'>
<HomeCell/>
</section>
    </div>
  )
}

export default Wsflocation