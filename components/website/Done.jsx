import Image from 'next/image'
import React from 'react'

const Done = () => {
    return (
        <div className='py-8 px-4 md:px-10 flex justify-between lg:px-16'>
            <div className='flex flex-col gap-[24px] w-[430px]'>
                <h2 className='text-[40px] font-semibold text-[#121212] w-[427px] leading-12'>
                    What God Has Done Among Us
                </h2>
                <p className='w-[366px] text-[16px] font-normal text-[#000000]'>
                    Hear how lives have been changed through faith, prayer, and the power of God in our midst.
                </p>
            </div>
            <div className='bg-[#F5F5F5] py-6 px-6 flex rounded-[24px] flex-col gap-8  min-h-[475px]'>
                <Image src="/apos.svg" alt="What God Has Done Among Us" width={54} height={32} className='h-auto object-cover' />
                <p className=' text-[32px] font-normal text-[#121212E5] px-6'>
                    For over a year, I was trusting God for a job. I applied to countless places and faced repeated rejections. It got to a point where I almost gave up, but I kept holding on to God’s word and stayed committed to prayer.
                    Today, I’m working in a stable role, and God has restored my confidence and peace. Truly, God is faithful and He shows up right on time.
                </p>
                <h2 className='text-[32px] font-semibold text-[#000000] px-6'>
                    Omowumi Oyinloye
                </h2>
            </div>
        </div>
    )
}

export default Done