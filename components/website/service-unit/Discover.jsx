import React from 'react'
import { infos } from '../../libs/data'
import Image from 'next/image'

const Discover = () => {

  return (
    <div className="py-8 px-4 md:px-10 flex flex-col items-center gap-[40px] lg:px-16">
      <div className="flex flex-col w-full">
        <h2 className='text-[#121212] text-[30px] leading-[50px] font-semibold lg:w-[756px]'>
          Discover the Different Service Units You Can Be Part Of
        </h2>
        <p className='text-[#000000CC] lg:w-[600px] w-full md:[625px]'>
          Explore a range of  Units  where you can serve, grow in faith, and contribute meaningfully to the church community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-3 gap-6">
        {infos.map((info, idx) => (
          <div key={idx} className="flex flex-col gap-4 p-3 rounded-lg bg-[#F5F5F5]">
            <Image width={471} height={470} src={info.image} alt={info.title} className="object-cover" />
            <h3 className="text-[16px] font-semibold text-[#121212]">{info.title}</h3>
            <p className="text-[14px] font-normal text-[#121212]">{info.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Discover