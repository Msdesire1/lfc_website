"use client";

// import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "/sitec.jpg",
    subtitle: "Exploits of Faith",
  },
  {
    id: 2,
    image:
      "/siteb.webp",
    subtitle: "Born to Win",
  },
  {
    id: 3,
    image:
      "/sitea.webp",
    subtitle: "Satan Get Lost",
  },
  {
    id: 4,
    image:
      "/sited.jpg",
    subtitle: "The Lifestyle of Faith",
  },
  {
    id: 5,
    image:
      "/sitee.jpg",
//
    subtitle: "Church Growth Manual",
  },
];

export default function Herobooks() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden ">
      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
             src={slides[current].image}
  alt={slides[current].title}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 flex h-full items-center px-6 md:px-14 lg:px-24">
        <div className="max-w-3xl overflow-hidden text-white">
          <motion.p
            key={slides[current].subtitle}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-[20px] uppercase tracking-[6px] text-white"
          >
            {slides[current].subtitle}
          </motion.p>

          <motion.h1
            key={slides[current].title}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="mb-6 text-[32px] font-bold leading-tight "
          >
            {slides[current].title}
          </motion.h1>
        </div>
      </div>

      {/* Floating Thumbnail Carousel */}
      <div className="absolute bottom-10 right-6 z-30 hidden gap-4 md:flex">
        {slides.map((slide, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`relative h-28 w-44 cursor-pointer overflow-hidden rounded-2xl border-2 transition-all ${
              current === index
                ? "border-orange-500"
                : "border-transparent"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-3 left-3 text-sm font-semibold text-white">
              {slide.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-6 z-30 flex gap-4">
        <button
          onClick={prevSlide}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-[#EC3237]"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          onClick={nextSlide}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-[#EC3237]"
        >
          <ChevronRight size={26} />
        </button>
      </div>
    </section>
  );
}