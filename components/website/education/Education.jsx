// import React from 'react'

// const Education = () => {
//   return (
//     <div></div>
//   )
// }

// export default Education



import Image from 'next/image'
import React from 'react'

const campuses = [
  {
    name: 'Gaa-Imam School',
    address: 'Gaa-Imam Road, Ilorin',
    highlight: 'Primary and secondary school classrooms with strong academics, character development, and safe campus life.',
    image: '/khmsi.jpg',
  },
  {
    name: 'Olunlade School',
    address: 'Olunlade Street, Ilorin',
    highlight: 'A nurturing campus for primary and secondary learners with a focus on excellence and Christian values.',
    image: '/khmsii.jpg',
  },
  {
    name: 'Sango School',
    address: 'Sango District, Ilorin',
    highlight: 'A vibrant school location delivering quality primary and secondary education for growing learners.',
    image: '/khmsi.jpg',
  },
  {
    name: 'Omu-Aran Schools',
    address: 'Omu-Aran Road, Ilorin',
    highlight: 'A trusted campus for both primary and secondary students with strong academic support and community care.',
    image: '/khmsii.jpg',
  },
]

const programs = [
  {
    title: 'Primary School',
    description:
      'A strong primary school program that combines foundational academics with Bible-based values, creativity, and character development.',
    image: '/khmsi.jpg',
    alt: 'Primary School',
    reverse: false,
  },
  {
    title: 'Secondary School',
    description:
      'A focused secondary school program that prepares students for exams, leadership, and life with academic excellence rooted in faith.',
    image: '/khmsii.jpg',
    alt: 'Secondary School',
    reverse: true,
  },
  {
    title: 'Academic Support',
    description:
      'Exam preparation, mentoring, and study resources designed to help primary and secondary students succeed in school.',
    image: '/khmsi.jpg',
    alt: 'Academic Support',
    reverse: false,
  },
]

const  Education = () => {
  return (
    <div className="lg:px-20 px-6">
      <section className="mt-24 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#EC3237]">KHMS School Network</p>
          <h1 className="mt-5 text-[30px] font-semibold text-[#111111] ">
            KHMS Primary & Secondary Schools
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#444444]">
            Discover the KHMS schools at Gaa-Imam, Olunlade, Sango, and Omu-Aran. Each location delivers strong primary and secondary education rooted in Christian values, academic excellence, and student care.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-[#F8FAFC] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#111111]">Locations</p>
              <p className="mt-3 text-sm text-[#555555]">Gaa-Imam, Olunlade, Sango, Omu-Aran</p>
            </div>
            <div className="rounded-3xl bg-[#F8FAFC] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#111111]">School Levels</p>
              <p className="mt-3 text-sm text-[#555555]">Primary School & Secondary School</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-4xl bg-[#F4F4F4] shadow-lg">
          <Image
            src="/mainch.svg"
            alt="KHMS school campus hero"
            width={700}
            height={560}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-16">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#EC3237]">Schools locations</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#111111] md:text-4xl">
            KHMS schools across Ilorin, kwara-state
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#444444]">
            Each schools is designed to support spiritual growth, academic development, and community connection through age-appropriate teaching and ministry.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {campuses.map((campus, index) => (
            <article key={index} className="overflow-hidden rounded-3xl border border-[#E7E7E7] bg-white shadow-sm transition hover:-translate-y-1">
              <div className="relative h-52 w-full overflow-hidden bg-[#F4F4F4]">
                <Image
                  src={campus.image}
                  alt={campus.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="space-y-4 p-6">
                <h3 className="text-xl font-semibold text-[#111111]">{campus.name}</h3>
                <p className="text-sm leading-7 text-[#555555]">{campus.highlight}</p>
                <div className="rounded-2xl bg-[#FAFAFA] p-4 text-sm">
                  <p className="font-semibold text-[#111111]">Address</p>
                  <p className="mt-2 text-[#444444]">{campus.address}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 pb-20">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#EC3237]">KHMS school levels</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#111111] md:text-4xl">
            Primary and Secondary School Programs
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#444444]">
            KHMS offers a complete school experience for primary and secondary learners, with strong academics, mentoring, and character development at every level.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {programs.map((program) => (
            <section key={program.title} className="w-full">
              <div className={`mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 ${program.reverse ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex justify-center">
                  <div className="overflow-hidden rounded-3xl shadow-sm">
                    <Image
                      src={program.image}
                      alt={program.alt}
                      width={500}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="max-w-md text-center lg:text-left">
                    <h3 className="mb-5 text-2xl font-bold text-[#111111] md:text-3xl">{program.title}</h3>
                    <p className="text-sm leading-7 text-[#555555] md:text-base">{program.description}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Education