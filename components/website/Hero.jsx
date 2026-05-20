"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
 const slides = [
  {
    id: 1,
    image: "/slide1.svg",
  },
  {
    id: 2,
    image: "/call.svg",
  },
  {
    id: 3,
    image: "/slide3.svg",
    text: "GOD'S WORD STILL WORKS ",
    subText: "Experience God's Presence With Us",
  },
];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full py-8 px-4 md:px-10 lg:px-20">
      <div className="relative w-full mx-auto overflow-hidden rounded-[30px]">

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
{slides.map((slide) => (
  <div
    key={slide.id}
    className="relative min-w-full h-[550px] sm:h-[350px] md:h-[700px]"
  >
    <img
      src={slide.image}
      alt="slide"
      className="w-full h-full object-cover"
    />



    {/* Center Text */}
    {slide.text && (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl md:text-6xl font-bold">
          {slide.text}
<p className="py-2">WONDERS TODAY</p>
<p>PSALM 119:18</p>
        </h1>

        <p className="text-white mt-4 text-sm md:text-xl max-w-2xl">
          {slide.subText}
        </p>

        <Link href={"/website/contact"} className="mt-6 bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-[12px] transition-all duration-300">
          Join Us
        </Link>
      </div>
    )}
  </div>
))}
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#ef4444] hover:bg-red-600 transition-all w-8 h-8 rounded-md flex items-center justify-center"
        >
          <ChevronLeft className="text-white w-4 h-4" />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#ef4444] hover:bg-red-600 transition-all w-8 h-8 rounded-md flex items-center justify-center"
        >
          <ChevronRight className="text-white w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-red-500 scale-110"
                  : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;