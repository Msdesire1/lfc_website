// import Image from 'next/image'
// import React from 'react'

// const Done = () => {
//     return (
//         <div className='py-8 px-4 md:px-10 flex justify-between lg:px-16'>
//             <div className='flex flex-col gap-[24px] w-[430px]'>
//                 <h2 className='text-[40px] font-semibold text-[#121212] w-[427px] leading-12'>
//                     What God Has Done Among Us
//                 </h2>
//                 <p className='w-[366px] text-[16px] font-normal text-[#000000]'>
//                     Hear how lives have been changed through faith, prayer, and the power of God in our midst.
//                 </p>
//             </div>
//             <div className='bg-[#F5F5F5] py-6 px-6 flex rounded-[24px] flex-col gap-8  min-h-[475px]'>
//                 <Image src="/apos.svg" alt="What God Has Done Among Us" width={54} height={32} className='h-auto object-cover' />
//                 <p className=' text-[32px] font-normal text-[#121212E5] px-6'>
//                     For over a year, I was trusting God for a job. I applied to countless places and faced repeated rejections. It got to a point where I almost gave up, but I kept holding on to God’s word and stayed committed to prayer.
//                     Today, I’m working in a stable role, and God has restored my confidence and peace. Truly, God is faithful and He shows up right on time.
//                 </p>
//                 <h2 className='text-[32px] font-semibold text-[#000000] px-6'>
//                     Omowumi Oyinloye
//                 </h2>
//             </div>
//         </div>
//     )
// }

// export default Done



"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonies = [
  {
    name: "Omowumi Oyinloye",
    text: "For over a year, I was trusting God for a job. I applied to countless places and faced repeated rejections. It got to a point where I almost gave up, but I kept holding on to God’s word and stayed committed to prayer. Today, I’m working in a stable role, and God has restored my confidence and peace. Truly, God is faithful and He shows up right on time.",
  },
  {
    name: "Samuel Adeyemi",
    text: "God healed me from constant fear and anxiety. Through prayers and fellowship, I found peace again. My life has completely changed and I now walk boldly with confidence.",
  },
  {
    name: "Blessing Johnson",
    text: "After many years of delay, God blessed my family with a new home. We prayed faithfully and trusted Him through every challenge. Today we are living in answered prayers.",
  },
  {
    name: "David Akinola",
    text: "I was struggling financially and didn’t know what to do. But God opened unexpected doors for me and provided beyond my imagination. His grace truly sustained me.",
  },
  {
    name: "Ruth Emmanuel",
    text: "Doctors said it would be difficult, but after months of prayers and faith, God gave me complete healing. I am living proof that miracles still happen.",
  },
  {
    name: "Tolu Fashina",
    text: "My relationship with God became stronger through this ministry. I found purpose, direction, and a deeper understanding of God’s love for my life.",
  },
  {
    name: "Victoria Bello",
    text: "God restored peace in my family after years of misunderstanding and pain. Through prayer and counseling, our home is now filled with joy again.",
  },
  {
    name: "Daniel Ogunleye",
    text: "I trusted God for admission for years. When it finally came, it was beyond what I expected. God’s timing is truly perfect and never late.",
  },
  {
    name: "Esther Ajayi",
    text: "I experienced God’s favor in my business. Opportunities started coming from places I never imagined. God has been faithful every step of the way.",
  },
  {
    name: "Michael Peters",
    text: "There was a season I felt lost and discouraged, but through the word and prayers, God renewed my strength. Today I stand stronger and full of hope.",
  },
];

const Done = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change testimony every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonies.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 px-4 md:px-10 lg:px-20 flex flex-col lg:flex-row gap-10 justify-between overflow-hidden">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 max-w-[430px]"
      >
        <h2 className="text-[32px] md:text-[40px] font-semibold text-[#121212] leading-tight">
          What God Has Done Among Us
        </h2>

        <p className="text-[16px] font-normal text-[#000000]">
          Hear how lives have been changed through faith, prayer, and the power
          of God in our midst.
        </p>
      </motion.div>

      {/* Testimony Card */}
      <div className="relative bg-[#F5F5F5] py-8 px-6 rounded-[24px] flex flex-col gap-8 min-h-[500px] lg:w-[700px] overflow-hidden">
        {/* Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] bg-[#D4AF37] rounded-full blur-3xl"
        />

        <Image
          src="/apos.svg"
          alt="quote"
          width={54}
          height={32}
          className="h-auto object-cover z-10"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.96 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8 z-10"
          >
            <p className="text-[22px] md:text-[30px] font-normal text-[#121212E5] leading-relaxed">
              {testimonies[currentIndex].text}
            </p>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[24px] md:text-[32px] font-semibold text-[#000000]"
            >
              {testimonies[currentIndex].name}
            </motion.h2>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center gap-3 mt-auto z-10">
          {testimonies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? "w-8 h-3 bg-black"
                  : "w-3 h-3 bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Done;