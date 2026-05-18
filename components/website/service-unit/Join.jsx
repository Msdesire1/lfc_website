import Image from 'next/image'
import React from 'react'

const Join = () => {
  return (
    <div className='bg-[#F5F5F5] w-full className="py-8 px-4 md:px-10 h-[717px] flex justify-between items-center gap-[40px] lg:px-16"'>
      <div className='w-full'>
        <div>
          <h2 className='text-[#121212] text-[40px] leading-[50px] font-semibold'>
            Join a Ministry
          </h2>
          <p className='text-[#000000CC] lg:w-[625px] text-[16px] w-full md:w-[625px]'>
            Take the next step by signing up for a ministry that aligns with your interests, gifts, and availability. We are excited to have you serve and grow with us.
          </p>
        </div>
        <Image width={471} height={470} src="/cars.svg" alt="join" className="object-cover" />
      </div>
      <div className='bg-[#FDFDFD] w-full px-5'>
        <h2 className='text-[#121212] text-[20px] font-semibold'>
          Please fill out the form below and we will be in contact with you with your next step.
        </h2>
        <form>
          <div className='grid grid-cols-1 gap-3 space-y-4 lg:grid-cols-2 md:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <label className='text-[#121212] text-[16px] font-medium'>
                First Name
              </label>
              <input type="text" className='w-full border-[1px] border-[#00000033] rounded-[8px] h-[40px] p-2' />
            </div>
            <div className='flex flex-col gap-4'>
              <label className='text-[#121212] text-[16px] font-medium'>
                Last Name
              </label>
              <input type="text" className='w-full border-[1px] border-[#00000033] rounded-[8px] h-[40px] p-2' />
            </div>
            <div className='flex flex-col gap-4'>
              <label className='text-[#121212] text-[16px] font-medium'>
                Email Address
              </label>
              <input type="text" className='w-full border-[1px] border-[#00000033] rounded-[8px] h-[40px] p-2' />
            </div>
            <div className='flex flex-col gap-4'>
              <label className='text-[#121212] text-[16px] font-medium'>
                Phone Number
              </label>
              <input type="text" className='w-full border-[1px] border-[#00000033] rounded-[8px] h-[40px] p-2' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Join