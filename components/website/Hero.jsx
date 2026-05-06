// "use client";

// import { useState, useEffect, useCallback } from "react";

// const slides = [
//   {
//     id: 1,
//     tag: "Technology",
//     title: "The Future Is\nAlready Here",
//     subtitle: "Artificial intelligence is reshaping the boundaries of what machines can imagine, create, and decide.",
//     cta: "Explore AI",
//     accent: "#6C63FF",
//     bg: "bg-[linear-gradient(135deg,#0D0D1A_0%,#1A1030_50%,#0D0D1A_100%)]",
//   },
//   {
//     id: 2,
//     tag: "Design",
//     title: "Form Follows\nFeeling",
//     subtitle: "Great design isn't seen — it's felt.",
//     cta: "See Work",
//     accent: "#FF6B6B",
//     bg: "bg-[linear-gradient(135deg,#1A0A0A_0%,#2B1111_50%,#1A0A0A_100%)]",
//   },
// ];

// export default function Hero() {
//   const [current, setCurrent] = useState(0);
//   const [prev, setPrev] = useState(null);
//   const [direction, setDirection] = useState("next");
//   const [animating, setAnimating] = useState(false);

//   const goTo = useCallback((index, dir = "next") => {
//     if (animating || index === current) return;
//     setDirection(dir);
//     setPrev(current);
//     setAnimating(true);
//     setCurrent(index);

//     setTimeout(() => {
//       setPrev(null);
//       setAnimating(false);
//     }, 700);
//   }, [animating, current]);

//   const next = () => goTo((current + 1) % slides.length, "next");
//   const prevSlide = () => goTo((current - 1 + slides.length) % slides.length, "prev");

//   const slide = slides[current];
//   const prevData = prev !== null ? slides[prev] : null;

//   return (
//     <div className="min-h-screen w-full  px-5 py-10 font-serif">
//       <div className="w-full max-w-5xl">

//         {/* Header */}
//         <div className="flex justify-between mb-5 text-xs text-white/40 tracking-[3px] uppercase font-mono">
//           <span>Featured Collection</span>
//           <span>{String(current + 1).padStart(2, "0")} / {slides.length}</span>
//         </div>

//         {/* Slider */}
//         <div className="relative h-[480px] rounded-2xl overflow-hidden bg-neutral-900">

//           {/* Previous */}
//           {prevData && (
//             <div
//               className={`absolute inset-0 z-[1] ${prevData.bg} ${
//                 direction === "next" ? "animate-slideExitLeft" : "animate-slideExitRight"
//               }`}
//             />
//           )}

//           {/* Active */}
//           <div
//             key={current}
//             className={`absolute inset-0 z-[2] ${slide.bg} ${
//               animating
//                 ? direction === "next"
//                   ? "animate-slideEnterRight"
//                   : "animate-slideEnterLeft"
//                 : ""
//             }`}
//           >
//             {/* Content */}
//             <div className="absolute inset-0 flex flex-col justify-end p-14 z-10">

//               <span
//                 className="mb-5 inline-block text-[11px] px-4 py-1 rounded-full font-mono tracking-[3px] uppercase border"
//                 style={{
//                   color: slide.accent,
//                   borderColor: slide.accent + "55",
//                   background: slide.accent + "22",
//                 }}
//               >
//                 {slide.tag}
//               </span>

//               <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white whitespace-pre-line mb-5 animate-fadeUp">
//                 {slide.title}
//               </h2>

//               <p className="text-white/70 max-w-md mb-8 animate-fadeUp delay-150">
//                 {slide.subtitle}
//               </p>

//               <div className="flex gap-4 animate-fadeUp delay-300">
//                 <button
//                   className="px-7 py-3 rounded-lg text-sm font-semibold transition hover:opacity-80"
//                   style={{ background: slide.accent }}
//                 >
//                   {slide.cta} →
//                 </button>

//                 <button className="px-5 py-3 border border-white/20 text-white/70 rounded-lg hover:bg-white/10">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:scale-110 transition"
//           >
//             ‹
//           </button>

//           <button
//             onClick={next}
//             className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:scale-110 transition"
//           >
//             ›
//           </button>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center mt-6 gap-2">
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               className={`h-[3px] rounded transition-all ${
//                 i === current ? "w-12 bg-white" : "w-6 bg-white/30"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    tag: "Technology",
    title: "The Future Is\nAlready Here",
    subtitle: "Artificial intelligence is reshaping the boundaries of what machines can imagine, create, and decide.",
    cta: "Explore AI",
    accent: "#6C63FF",
    bg: "linear-gradient(135deg, #0D0D1A 0%, #1A1030 50%, #0D0D1A 100%)",
    shape: "circle",
    shapeColor: "#6C63FF22",
    textColor: "#fff",
    tagColor: "#6C63FF",
    numberColor: "#ffffff18",
  },
  {
    id: 2,
    tag: "Design",
    title: "Form Follows\nFeeling",
    subtitle: "Great design isn't seen — it's felt. Every pixel, every pause, every shadow carries intention.",
    cta: "See Work",
    accent: "#FF6B6B",
    bg: "linear-gradient(135deg, #1A0A0A 0%, #2B1111 50%, #1A0A0A 100%)",
    shape: "rect",
    shapeColor: "#FF6B6B22",
    textColor: "#fff",
    tagColor: "#FF6B6B",
    numberColor: "#ffffff18",
  },
  {
    id: 3,
    tag: "Nature",
    title: "Wilderness\nCalls Loudest",
    subtitle: "Beneath the noise of modern life, ancient forests breathe and rivers remember the original silence.",
    cta: "Discover",
    accent: "#22C55E",
    bg: "linear-gradient(135deg, #071A0E 0%, #0D2B18 50%, #071A0E 100%)",
    shape: "triangle",
    shapeColor: "#22C55E22",
    textColor: "#fff",
    tagColor: "#22C55E",
    numberColor: "#ffffff18",
  },
  {
    id: 4,
    tag: "Architecture",
    title: "Space Is the\nSilent Language",
    subtitle: "Buildings speak without words. Concrete, glass, and steel tell the stories of entire civilizations.",
    cta: "View Projects",
    accent: "#F59E0B",
    bg: "linear-gradient(135deg, #1A1200 0%, #2B1F00 50%, #1A1200 100%)",
    shape: "cross",
    shapeColor: "#F59E0B22",
    textColor: "#fff",
    tagColor: "#F59E0B",
    numberColor: "#ffffff18",
  },
  {
    id: 5,
    tag: "Ocean",
    title: "Depth Beyond\nMeasure",
    subtitle: "Over 80% of Earth's oceans remain unexplored. In the deep dark, evolution wrote its strangest chapters.",
    cta: "Dive In",
    accent: "#06B6D4",
    bg: "linear-gradient(135deg, #00101A 0%, #001C2B 50%, #00101A 100%)",
    shape: "wave",
    shapeColor: "#06B6D422",
    textColor: "#fff",
    tagColor: "#06B6D4",
    numberColor: "#ffffff18",
  },
  {
    id: 6,
    tag: "Humanity",
    title: "Stories Worth\nTelling Again",
    subtitle: "Every culture, every era, every face carries a universe of meaning. Look closer — listen longer.",
    cta: "Read More",
    accent: "#EC4899",
    bg: "linear-gradient(135deg, #1A001A 0%, #2B0020 50%, #1A001A 100%)",
    shape: "diamond",
    shapeColor: "#EC489922",
    textColor: "#fff",
    tagColor: "#EC4899",
    numberColor: "#ffffff18",
  },
];

function ShapeDecor({ shape, color }) {
  const baseClasses = "absolute inset-0 opacity-20 pointer-events-none";

  if (shape === "circle") {
    return <div className={`${baseClasses} rounded-full border-[12px]`} style={{ borderColor: color }} />;
  }

  if (shape === "rect") {
    return <div className={`${baseClasses} border-[12px] rotate-12`} style={{ borderColor: color }} />;
  }

  if (shape === "triangle") {
    return (
      <div
        className={baseClasses}
        style={{
          backgroundColor: color,
          clipPath: "polygon(50% 10%, 90% 90%, 10% 90%)",
        }}
      />
    );
  }

  if (shape === "cross") {
    return (
      <div className={baseClasses} style={{ color }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[140%] h-4 bg-current rotate-45" />
          <div className="absolute w-4 h-[140%] bg-current -rotate-45" />
        </div>
      </div>
    );
  }

  if (shape === "wave") {
    return (
      <div
        className={`${baseClasses} bg-current`}
        style={{
          color,
          clipPath: "polygon(0% 60%, 20% 40%, 40% 65%, 60% 35%, 80% 55%, 100% 45%, 100% 100%, 0% 100%)",
        }}
      />
    );
  }

  if (shape === "diamond") {
    return <div className={`${baseClasses} rotate-45 border-[14px]`} style={{ borderColor: color }} />;
  }

  return null;
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState("next");
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000;

  const goTo = useCallback((index, dir = "next") => {
    if (animating || index === current) return;

    setDirection(dir);
    setPrev(current);
    setAnimating(true);
    setCurrent(index);
    setProgress(0);

    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 700);
  }, [animating, current]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev_ = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  // Auto progress
  useEffect(() => {
    let start = null;
    let raf;

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));

      if (elapsed < DURATION) {
        raf = requestAnimationFrame(animate);
      } else {
        next();
      }
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [current, next]);

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white text-white font-serif">
      {/* Current Background */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ background: slide.bg }}
      />

      {/* Exiting Slide */}
      {prevSlide && (
        <div
          className={`absolute inset-0 z-10 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            direction === "next" ? "translate-x-[-100%]" : "translate-x-[100%]"
          }`}
          style={{ background: prevSlide.bg }}
        >
          <div className="absolute inset-0 bg-bla/30" />
        </div>
      )}

      {/* Active Slide */}
      <div
        className={`absolute inset-0 z-20 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          animating
            ? direction === "next"
              ? "translate-x-0"
              : "translate-x-0"
            : ""
        }`}
        style={{ background: slide.bg }}
      >
        {/* Big Background Number */}
        <div
          className="absolute inset-0 flex items-center justify-center text-[28vw] font-bold leading-none select-none pointer-events-none"
          style={{ color: slide.numberColor }}
        >
          {String(current + 1).padStart(2, "0")}
        </div>

        {/* Shape Decoration */}
        <ShapeDecor shape={slide.shape} color={slide.shapeColor} />

        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-30 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="text-xs uppercase tracking-[3px] text-white/60">Featured Collection</div>
            <div className="h-px flex-1 bg-white/10" />
            <div className="font-mono text-sm tracking-widest">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          </div>

          {/* Tag */}
          <div
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-6 tracking-wider"
            style={{ backgroundColor: `${slide.tagColor}22`, color: slide.tagColor }}
          >
            {slide.tag}
          </div>

          {/* Title */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tighter mb-8 whitespace-pre-line"
            style={{ color: slide.textColor }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-lg text-lg md:text-xl text-white/80 leading-relaxed mb-12"
            style={{ color: slide.textColor }}
          >
            {slide.subtitle}
          </p>

          {/* CTA */}
          <button
            className="group flex items-center gap-3 text-lg font-medium hover:text-white transition-colors"
            style={{ color: slide.accent }}
          >
            {slide.cta}
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>

        {/* Accent Line */}
        <div
          className="absolute top-0 left-0 h-px w-1/3"
          style={{ background: `linear-gradient(to right, ${slide.accent}, transparent)` }}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev_}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-3xl hover:border-white/40 transition-all active:scale-95"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-3xl hover:border-white/40 transition-all active:scale-95"
      >
        ›
      </button>

      {/* Progress Bars */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            className={`relative h-1 rounded-full overflow-hidden transition-all duration-500 ${
              i === current ? "w-12 bg-white" : "w-6 bg-white/30 hover:bg-white/50"
            }`}
          >
            {i === current && (
              <div
                className="absolute inset-0 bg-white origin-left transition-transform duration-75"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Thumbnails Strip */}
      <div className="absolute bottom-6 right-8 z-50 hidden lg:flex gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            className={`relative flex-shrink-0 w-[52px] h-[34px] rounded-xl border-2 overflow-hidden transition-all duration-300 hover:scale-105 ${
              i === current ? "border-white shadow-lg" : "border-transparent opacity-60 hover:opacity-90"
            }`}
            style={{
              background: s.bg,
              borderColor: i === current ? s.accent : "transparent",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/70">
              {String(i + 1).padStart(2, "0")}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}