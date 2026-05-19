import Image from 'next/image'
import React from 'react'
import { teams } from '../../libs/data'

const Join = () => {
  return (
    <div className='bg-[#F5F5F5] w-full py-8 px-4 md:px-10 min-h-[857px]  flex justify-between gap-[40px] lg:px-16'>
      <div className='w-full flex flex-col gap-10'>
        <div>
          <h2 className='text-[#121212] text-[40px] leading-[50px] font-semibold'>
            Join a Ministry
          </h2>
          <p className='text-[#000000CC] lg:w-[625px] text-[16px] w-full md:w-[625px]'>
            Take the next step by signing up for a ministry that aligns with your interests, gifts, and availability. We are excited to have you serve and grow with us.
          </p>
        </div>
        <Image width={700} height={610} src="/cars.svg" alt="join" className="object-cover" />
      </div>
      <div className='bg-[#FDFDFD] rounded-[20px] h-fit py-4 w-full px-5'>
        <h2 className='text-[#121212] text-[20px] font-semibold'>
          Please fill out the form below and we will be in contact with you with your next step.
        </h2>
        <form className='mt-5'>
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
          <h2 className='text-[#121212] text-[16px] font-medium'>
            What Team are you interested in?
          </h2>
          <div className='grid grid-cols-2 lg:grid-cols-4 space-y-5 mt-5 md:grid-cols-3'>
            {teams.map((team, index) => (
              <div key={index} className='flex items-center gap-2'>
                <input type="checkbox" className='w-[20px] h-[20px] border-[1px] border-[#00000033] rounded-[4px]' />
                <label className='text-[#121212] text-[14px] font-normal'>
                  {team}
                </label>
              </div>
            ))}
          </div>

          <div className='flex flex-col gap-4'>
            <label className='text-[#121212] text-[16px] font-medium'>
              Message
            </label>
            <textarea className='w-full border-[1px] border-[#00000033] rounded-[8px] h-[100px] p-2' />
          </div>

          <button className='bg-[#121212] cursor-pointer text-[#FDFDFD] w-[120px] h-[40px] rounded-[8px] mt-5'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Join