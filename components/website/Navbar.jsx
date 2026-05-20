


"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const ministriesLinks = [
  { label: "Main's Church", href: "/website/mainchurch" },
  { label: "Youth Church", href: "/website/youthchurch" },
  { label: "Teens Church", href: "/website/teenschurch" },
  { label: "Children's Church", href: "/website/childrenchurch" },
];

const wsfLinks = [
  { label: "WSF Locations", href: "/website/wsflocation" },
  { label: "Books", href: "/website/books" },
];

const educationLinks = [
  { label: "KHMS", href: "/website/khms" },
  { label: "Faith Academy", href: "/website/faithacademy" },
];

const aboutLinks = [
  { label: "The Mandate", href: "/website/mandate" },
  { label: "Our Pastors", href: "/website/ourpastors" },
   { label: "Service Unit", href: "/website/service-unit" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/website/about",dropdown: aboutLinks},
  { label: "Ministries", href: "/website/ministries", dropdown: ministriesLinks },
  { label: "WSF", href: "/website/wsf", dropdown: wsfLinks },
   { label: "WOFBI", href: "/website/wofbi" },
  { label: "Media Center", href: "/website/media" },
  { label: "Education", href: "/website/education", dropdown: educationLinks },
  { label: "Contact Us", href: "/website/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 bg-white
      ${
        scrolled
          ? "bg-[#0A0A0F]/90"
          : "bg-transparent"
      }
      animate-[slideDown_0.6s_cubic-bezier(0.16,1,0.3,1)]`}
    >
      <div className="flex items-center h-[72px] px-8 gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-4  leading-none">
            <Image src="/logo.svg" alt="Logo" width={50} height={48} />
            <span
              className={`text-[16px] font-medium tracking-wide font-serif
              ${scrolled ? "text-[#121212]" : "text-[#121212]"}`}
            >
              LFC NEW JERUSALEM, ILORIN
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex flex-1 justify-center items-center gap-1">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={() => item.dropdown && handleMouseLeave()}
            >
              <Link
                href={item.href}
                className={`group relative flex items-center gap-1 px-3 py-1 text-[15px] font-medium transition-all
                ${
                  scrolled
                    ? "text-[#000000]/50 hover:text-black"
                    : "text-black hover:text-red-400"
                }`}
              >
                {item.label}

                {/* Dropdown Arrow */}
                {item.dropdown && (
                  <svg
                    className={`w-[10px] h-[10px] transition-all duration-300
                    ${
                      activeDropdown === item.label
                        ? "rotate-180 opacity-100"
                        : "opacity-60"
                    }`}
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 4l3 3 3-3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                {/* underline animation */}
                <span className="absolute left-1/2 right-1/2 bottom-[2px] h-[1px] bg-red-500 transition-all duration-300 group-hover:left-3 group-hover:right-3"></span>
              </Link>

              {/* Dropdown */}
              {item.dropdown && (
                <div
                  className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[210px]
                   bg-black backdrop-blur-xl border border-[#C9A84C]/20 rounded-[10px] text-black p-2 shadow-xl
                  transition-all duration-200
                  ${
                    activeDropdown === item.label
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-3 py-2 text-[14px] text-white hover:text-red-400 hover:bg-[#C9A84C]/10 rounded-md"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Give Button */}
        <Link
          href="/website/giveonline"
          className="hidden lg:flex items-center gap-2 px-5 py-2 text-[13px] font-semibold uppercase tracking-wide
          bg-red-500 text-white rounded-[10px] hover:bg-[#78343e] transition-all hover:-translate-y-[1px]"
        >
          Give Online
        </Link>

        {/* Mobile Burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1 ml-auto"
        >
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 bg-[#0A0A0F]/95 backdrop-blur-xl
        border-b border-[#C9A84C]/20 transition-all duration-500 overflow-hidden
        ${mobileOpen ? "max-h-[90vh]" : "max-h-0"}`}
      >
        <div className="px-6 py-4">
          {navLinks.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    className="w-full flex items-center justify-between py-3 text-[#F0EDE6]"
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}

                    {/* Mobile Arrow */}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300
                      ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M2 4l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all
                    ${
                      mobileExpanded === item.label
                        ? "max-h-[300px]"
                        : "max-h-0"
                    }`}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 pl-4 text-sm text-[#F0EDE6]/70"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-3 text-[#F0EDE6]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <Link
            href="/website/giveonline"
            className="block mt-4 text-center py-3  bg-red-500 text-white rounded-[10px] hover:bg-[#78343e] text-black"
          >
            Give Online
          </Link>
        </div>
      </div>
    </nav>
  );
}
