import Image from 'next/image'
import React from 'react'

const Yoruba = () => {
  return (
    <section className="w-full bg-[#F5F5F5] py-16 px-4 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="text-[30px] font-semibold uppercase tracking-[3px] text-[#EC3237]">
            Kilasi Yoruba
          </span>

          <h2 className="text-[32px] font-semibold leading-tight text-[#121212] md:text-[40px]">
            E ko oro Olorun ni ede Yoruba
          </h2>

          <div className="flex flex-col gap-4 text-[16px] leading-8 text-[#121212CC]">
            <p>
              E kaabo si kilasi Yoruba wa, ibi ti a ti n ko oro Olorun,
              igbagbo, ati ona igbesi aye Kristi ni ede abinibi wa.
            </p>

            <p>
              Kilasi yi wa fun gbogbo eni ti o fe ni oye jinle nipa Bibeli,
              adura, ati ise ijoba Olorun pelu ede Yoruba ti o ye wa daadaa.
            </p>
          </div>

          <div className="mt-2 grid gap-3 text-[14px] text-[#121212] sm:grid-cols-2">
            <div className="rounded-lg bg-white px-5 py-4 shadow-sm">
              Eko Bibeli ni Yoruba
            </div>
            <div className="rounded-lg bg-white px-5 py-4 shadow-sm">
              Idagbasoke ninu igbagbo
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] shadow-lg">
          <Image
            src="/yruba.jpg"
            alt="Yoruba class"
            width={650}
            height={520}
            className="h-[360px] w-full object-cover md:h-[480px]"
          />
        </div>
      </div>
    </section>
  )
}

export default Yoruba
