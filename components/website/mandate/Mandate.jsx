import Image from 'next/image'
import React from 'react'

const Mandate = () => {
  return (
    <div className="pb-12 mt-36 px-4 md:px-10 flex items-center gap-12 justify-between lg:px-16">
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-[60px] font-semibold text-[#000000]'  >
          Our Mandate
        </h2>
        <span className='text-[24px] font-normal w-[723px] text-[#121212]'>
          Our mandate defines the purpose and direction of the church. It reflects our calling to spread God’s word, build lives, and raise individuals who live with faith, purpose, and impact.
        </span>
      </div>

      <Image width={660} height={486} src="/mandate.svg" alt="mandate" className='object-cover' />
    </div>
  )
}

export default Mandate