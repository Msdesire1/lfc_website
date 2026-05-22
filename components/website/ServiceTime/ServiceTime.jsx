
"use client";

import React from "react";
import { motion } from "framer-motion";

const ServiceTime = () => {
  const time = [
    {
      name: "Sunday Worship Service",
      time1: "Service - 7:30AM - 9:30AM",
      image: "/sundays.jpg",
    },
    {
      name: "Midweek Communion Service",
      time1: "Wednesday – 5:00 PM - 6:30 PM",
      image: "/com.jpg",
    },
    {
      name: "Winners Satellite Fellowship",
      time1: "Saturdays – 5:00 PM - 6:00 PM",
      image: "/wi.jpg",
    },
    {
      name: "Convenant Hour of Prayer",
      time1: "Monday – Saturday 6:00AM - 7:00AM",
      image: "/prayer.jpg",
    },
  ];

  return (
    <div className="py-8 px-4 md:px-10 lg:px-20 overflow-hidden">
      {/* Heading Animation */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-[40px] font-semibold text-center mb-8 text-[#000]"
      >
        Service Times
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {time.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: idx * 0.2,
              type: "spring",
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-xl overflow-hidden shadow-lg min-h-[400px] w-full flex flex-col justify-center bg-cover bg-center group cursor-pointer"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition duration-500"></div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 + 0.3 }}
              viewport={{ once: true }}
              className="relative z-10 p-4 flex flex-col pt-40 items-center text-white text-center"
            >
              <h3 className="font-semibold text-[16px] mb-3">
                {item.name}
              </h3>

              <p className="text-[14px] text-white font-normal">
                {item.time1}
              </p>
            </motion.div>

            {/* Floating Glow Effect */}
            <div className="absolute -bottom-10 left-0 w-full h-24 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTime;