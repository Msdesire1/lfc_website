// "use client";

// import React, { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Link from "next/link";

// const Hero = () => {
//   const slides = [
//     {
//       id: 1,
//       video: "/newjerusalem.mp4",
//     },
//     {
//       id: 2,
//       image: "/slide1.svg",
//     },
//     {
//       id: 3,
//       image: "/call.svg",
//     },
//     {
//       id: 4,
//       image: "/slide3.svg",
//       text: "MY COMFORTER IS HERE.",
//       subText: "Experience God's Presence With Us Every Sunday's",
//     },
//     {
//       id: 5,
//       image: "/pickup.svg",
//     },
//   ];

//   const [current, setCurrent] = useState(0);

//   // Automatically move images after 5 seconds.
//   // Video slides are controlled by onEnded.
//   useEffect(() => {
//     const currentSlide = slides[current];

//     // If it is a video, don't start the 5-second timer.
//     if (currentSlide.video) {
//       return;
//     }

//     const timer = setTimeout(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [current]);

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <section className="w-full py-8 px-4 md:px-10 lg:px-20">
//       <div className="relative lg:w-full mx-auto overflow-hidden rounded-[30px]">

//         {/* Slides */}
//         <div
//           className="flex transition-transform duration-700 ease-in-out"
//           style={{
//             transform: `translateX(-${current * 100}%)`,
//           }}
//         >
//           {slides.map((slide) => (
//             <div
//               key={slide.id}
//               className="relative min-w-full h-[550px] sm:h-[350px] md:h-[700px]"
//             >

//               {/* VIDEO */}
//               {slide.video ? (
//                 <video
//                   key={slide.video}
//                   src={slide.video}
//                   autoPlay
//                   muted
//                   playsInline
//                   controls
//                   onEnded={() => {
//                     setCurrent((prev) => (prev + 1) % slides.length);
//                   }}
//                   className="w-full h-full object-cover rounded-b-[30px]"
//                 />
//               ) : (
//                 /* IMAGE */
//                 <img
//                   src={slide.image}
//                   alt="slide"
//                   className="w-full h-full object-cover rounded-b-[30px]"
//                 />
//               )}

//               {/* Center Text */}
//               {slide.text && (
//                 <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
//                   <h1 className="text-white text-3xl md:text-6xl font-bold">
//                     {slide.text}

//                     <p>Isaiah 44:3-5</p>
//                   </h1>

//                   <p className="text-white mt-4 text-sm md:text-xl max-w-2xl">
//                     {slide.subText}
//                   </p>

//                   <Link
//                     href="/website/contact"
//                     className="mt-6 bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-[12px] transition-all duration-300"
//                   >
//                     Join Us
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Left Button */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#ef4444] hover:bg-red-600 transition-all w-8 h-8 rounded-md flex items-center justify-center"
//         >
//           <ChevronLeft className="text-white w-4 h-4" />
//         </button>

//         {/* Right Button */}
//         <button
//           onClick={nextSlide}
//           className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#ef4444] hover:bg-red-600 transition-all w-8 h-8 rounded-md flex items-center justify-center"
//         >
//           <ChevronRight className="text-white w-4 h-4" />
//         </button>

//         {/* Dots */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrent(index)}
//               className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
//                 current === index
//                   ? "bg-red-500 scale-110"
//                   : "bg-white"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;





"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const slides = [
    {
      id: 1,
      video: "/newjerusalem.mp4",
    },
    {
      id: 2,
      image: "/slide1.svg",
    },
    {
      id: 3,
      image: "/call.svg",
    },
    {
      id: 4,
      image: "/slide3.svg",
      text: "MY COMFORTER IS HERE.",
      subText: "Experience God's Presence With Us Every Sunday's",
    },
    {
      id: 5,
      image: "/pickup.svg",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [showShilohModal, setShowShilohModal] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Shiloh runs December 8–13, 2026. Count down to opening day in local time.
  const shilohDate = new Date(2026, 11, 8, 0, 0, 0);

  /*
   * ==========================================
   * COUNTDOWN
   * ==========================================
   */
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = shilohDate.getTime();

      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (distance / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (distance / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const countdown = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdown);
  }, []);

  /*
   * ==========================================
   * AUTO SLIDER
   * ==========================================
   */
  useEffect(() => {
    const currentSlide = slides[current];

    // Video is controlled by onEnded
    if (currentSlide.video) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [current]);

  /*
   * ==========================================
   * SLIDER CONTROLS
   * ==========================================
   */
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="w-full py-8 px-4 md:px-10 lg:px-20">
      <div className="relative lg:w-full mx-auto overflow-hidden rounded-[30px]">

        {/* ==========================================
            SLIDES
        =========================================== */}
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

              {/* ==========================================
                  VIDEO SLIDE
              =========================================== */}
              {slide.video ? (
                <video
                  key={slide.video}
                  src={slide.video}
                  autoPlay
                  muted
                  playsInline
                  controls
                  onEnded={() => {
                    setCurrent(
                      (prev) => (prev + 1) % slides.length
                    );
                  }}
                  className="w-full h-full object-cover rounded-b-[30px]"
                />
              ) : (
                /* ==========================================
                   IMAGE SLIDE
                =========================================== */
                <img
                  src={slide.image}
                  alt="Church slide"
                  className="w-full h-full object-cover rounded-b-[30px]"
                />
              )}

              {/* ==========================================
                  CENTER TEXT
              =========================================== */}
              {slide.text && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-white text-3xl md:text-6xl font-bold">
                    {slide.text}

                    <p>Isaiah 44:3-5</p>
                  </h1>

                  <p className="text-white mt-4 text-sm md:text-xl max-w-2xl">
                    {slide.subText}
                  </p>

                  <Link
                    href="/website/contact"
                    className="mt-6 bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-[12px] transition-all duration-300"
                  >
                    Join Us
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ==========================================
            SHILOH 2026 MODAL
            SHOW ONLY ON FIRST SLIDE
        =========================================== */}
        {current === 0 && showShilohModal && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/10 p-3 backdrop-blur-sm sm:p-6">
            <div className="relative grid w-full max-w-4xl max-h-[94%] grid-cols-1 overflow-y-auto rounded-2xl bg-white shadow-2xl md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:overflow-hidden">
              <button type="button" onClick={() => setShowShilohModal(false)} className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition-colors hover:bg-red-500 hover:text-white" aria-label="Close Shiloh information"><X className="h-5 w-5" /></button>

              <div className="flex min-h-0 items-center justify-center bg-[#290907] p-3 sm:p-5 md:p-6">
                <img src="/shiloh-2026.jpg" alt="Shiloh 2026: Far Above, December 8–13 at Canaanland, Ota, Ogun State" className="max-h-[36vh] w-auto max-w-full rounded-lg object-contain md:max-h-[82vh]" />
              </div>

              <div className="flex flex-col justify-center bg-gradient-to-br from-[#fffdf8] to-[#fff4e4] p-5 pt-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-700">Winners Chapel International</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#25120d] sm:text-4xl">Shiloh 2026</h2>
                <p className="mt-1 text-lg font-bold text-amber-700">Far Above</p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">Join us for a time of worship, the Word, prayer and life changing encounters in God’s presence.</p>
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-200 bg-white/80 p-3">
                  <CalendarDays className="h-5 w-5 shrink-0 text-red-700" />
                  <div><p className="text-sm font-bold text-gray-900">Tuesday, December 8 – Sunday, December 13, 2026</p><p className="mt-0.5 flex items-center gap-1 text-xs text-gray-600"><MapPin className="h-3.5 w-3.5" /> Canaanland, Ota, Ogun State</p></div>
                </div>
                <div className="mt-5 rounded-2xl bg-[#260d0b] p-4 sm:p-5">
                  <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 sm:text-xs">Countdown to opening day</p>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {[[timeLeft.days, "Days"], [String(timeLeft.hours).padStart(2, "0"), "Hours"], [String(timeLeft.minutes).padStart(2, "0"), "Minutes"], [String(timeLeft.seconds).padStart(2, "0"), "Seconds"]].map(([value, label]) => (
                      <div key={label} className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-amber-400/40 bg-white/5 px-1 py-2.5 text-center sm:py-3"><span className="text-xl font-black tabular-nums leading-none text-white sm:text-2xl">{value}</span><span className="mt-1.5 text-[9px] uppercase tracking-wide text-white/65 sm:text-[10px]">{label}</span></div>
                    ))}
                  </div>
                </div>
                <Link href="/contact" onClick={() => setShowShilohModal(false)} className="mt-5 w-full rounded-xl bg-red-700 px-5 py-3 text-center font-bold text-white transition-colors hover:bg-red-800">Join Us</Link>
                <button type="button" onClick={() => setShowShilohModal(false)} className="mt-2 w-full rounded-xl py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-black/5 hover:text-gray-800">Continue to website</button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LEFT BUTTON
        =========================================== */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#ef4444] hover:bg-red-600 transition-all w-8 h-8 rounded-md flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white w-4 h-4" />
        </button>

        {/* ==========================================
            RIGHT BUTTON
        =========================================== */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#ef4444] hover:bg-red-600 transition-all w-8 h-8 rounded-md flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="text-white w-4 h-4" />
        </button>

        {/* ==========================================
            DOTS
        =========================================== */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">

          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-red-500 scale-110"
                  : "bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default Hero;
