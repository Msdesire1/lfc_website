"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const heroSlides = [
  {
    title: 'Explore our growing branch network',
    subtitle: 'Twelve Living Faith locations across Ilorin and nearby districts, designed for worship, prayer, and community support.',
    note: 'Each branch delivers dedicated fellowship and a warm welcome for families, students, and professionals alike.',
    image: '/mainch.svg',
  },
  {
    title: 'Discover our newest ministry hubs',
    subtitle: 'University Road and GRA branches are now open with fresh outreach and student-friendly experiences.',
    note: 'Join transformative praise sessions, Bible teaching, and life-changing gatherings near you.',
    image: '/church.svg',
  },
]

const branchList = [
  {
    name: 'Living Faith Church Irewolede',
    address: 'Irewolede Road, Ilorin',
    highlight: 'A warm worship center known for its vibrant and engaging services.',
    image: '/sitea.webp',
    badge: 'Ilorin  Branch',
  },
  {
    name: 'Living Faith Church Tanke',
    address: 'Wura Owolabi Street, opposite Chapel Secondary School junction',
    highlight: 'Strong family ministry with inspiring midweek Bible studies.',
    image: '/siteb.webp',
    badge: 'Ilorin  Branch',
  },
  {
    name: 'Living Faith Church Ganmo',
    address: 'Near NTA Transmission Station junction, Ilorin',
    highlight: 'Dedicated Sunday worship and prayer gatherings for all ages.',
    image: '/sitec.jpg',
   badge: 'Ilorin  Branch',
  },
  {
    name: 'Living Faith Church Adewole',
    address: 'Adewole area, Ilorin',
    highlight: 'A growing fellowship with strong discipleship and outreach.',
    image: '/sited.jpg',
    badge: 'Ilorin  Branch',
  },
  {
    name: 'Living Faith First Church',
    address: 'Offa Garage Railway Line, Ilorin',
    highlight: 'Known for restorative worship and life-changing encounters.',
    image: '/sitee.jpg',
    badge: 'First Church',
  },
  {
    name: 'Living Faith Church Basin',
    address: '71 Taoheed Road, off Basin Road, Ilorin',
    highlight: 'A strategic location that welcomes families and students alike.',
    image: '/faithi.jpg',
   badge: 'Ilorin  Branch',
  },
  {
    name: 'Living Faith Church Akerebiata',
    address: 'Sobi Road, Ilorin',
    highlight: 'A place of bold teaching and community care.',
    image: '/faithii.jpg',
   badge: 'Ilorin  Branch',
  },
  {
    name: 'Living Faith Church Amilegbe',
    address: 'Muritala Mohammed Way, Ilorin',
    highlight: 'A ministry space focused on strong spiritual formation.',
    image: '/faithiii.jpg',
    badge: 'Ilorin  Branch',
  },
  {
    name: 'Winners Chapel Offa',
    address: 'Muu Road, Offa',
    highlight: 'An outreach-focused branch serving the teaching and commerce district.',
    image: '/faithv.avif',
    badge: 'Offa Branch',
    outside: true,
  },
  {
    name: 'Living Faith Church Oyun',
    address: 'Share-Oja Oba Road, Apata Yakuba',
    highlight: 'Supporting believers with faithful teaching and practical outreach.',
    image: '/wobiimage.jpg',
    badge: 'Oyun branch',
    outside: true,
  },
  {
    name: 'Living Faith Church University',
    address: 'University Road, Ilorin',
    highlight: 'A student-friendly branch with focused campus ministry and vibrant fellowship.',
    image: '/mainone.svg',
    badge: 'Campus Ministry',
  },
  {
    name: 'Living Faith Church GRA',
    address: 'GRA District, Ilorin',
    highlight: 'An accessible branch serving families and professionals with rich worship experiences.',
    image: '/wobi.svg',
    badge: 'GRA Branch',
  },
]

const Branchs = () => {
  const [activeHero, setActiveHero] = useState(0)

  return (
    <div className="lg:px-20 px-6  py-24">
      <section className="mb-12 rounded-4xl bg-[#F8FAFC] px-6 py-12 shadow-md sm:px-10 lg:px-14">
        <div className="mx-auto flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <p className="text-sm uppercase tracking-[0.25em] text-[#EC3237]">
              Branch Spotlight
            </p>
            <h1 className="mt-5 text-xl font-semibold text-[#111111] md:text-[30px]">
              {heroSlides[activeHero].title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#444444]">
              {heroSlides[activeHero].subtitle}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#555555]">
              {heroSlides[activeHero].note}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {heroSlides.map((slide, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveHero(index)}
                  className={`h-3 w-3 rounded-full transition ${activeHero === index ? 'bg-[#EC3237]' : 'bg-[#D1D5DB]'}`}
                  aria-label={`View slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative lg:w-1/2">
            <div className="relative h-80 overflow-hidden rounded-3xl bg-[#E5E7EB]">
              <Image
                src={heroSlides[activeHero].image}
                alt={heroSlides[activeHero].title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-12 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#EC3237]">
          Our Branches
        </p>
        <h1 className="mt-4 text-[18px] font-semibold text-[#111111] md:text-[30px]">
          Other Living Faith Branches
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#444444]">
          Explore our twelve branches around Ilorin and beyond. Each location is built to welcome families, inspire worship, and support church growth through vibrant service experiences.
        </p>
      </section>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {branchList.map((branch, index) => (
          <article
            key={index}
            className="group overflow-hidden rounded-3xl border border-[#E7E7E7] bg-white transition duration-300 hover:-translate-y-1"
          >
            <div className="relative h-60 w-full overflow-hidden bg-[#F4F4F4]">
              <Image
                src={branch.image}
                alt={branch.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[18px] font-semibold text-[#111111]">
                  {branch.name}
                </h2>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${branch.outside ? 'bg-[#E6F2FF] text-[#2563EB]' : 'bg-[#FFF1F0] text-[#D92D20]'}`}>
                  {branch.badge}
                </span>
              </div>

              <p className="text-sm leading-7 text-[#555555]">
                {branch.highlight}
              </p>

              <div className="rounded-2xl bg-[#FAFAFA] p-4 text-sm">
                <p className="font-semibold text-[#111111]">Address</p>
                <p className="mt-2 text-[#444444]">{branch.address}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-14 rounded-4xl border border-[#E7E7E7] bg-[#F8FAFC] px-8 py-10 text-center">
        <p className="text-sm font-semibold text-[#EC3237]">Need help choosing a location?</p>
        <h2 className="mt-4 text-3xl font-semibold text-[#111111] md:text-4xl">
          Visit the branch closest to you
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#4B5563]">
          Each Living Faith branch is committed to providing a meaningful worship experience, prayer support, and community fellowship. Reach out through our contact page for directions or service times.
        </p>
        <a
          href="/website/contact"
          className="mt-8 inline-flex rounded-full bg-[#EC3237] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#c81b25]"
        >
          Contact Us for Directions
        </a>
      </section>
    </div>
  )
}

export default Branchs