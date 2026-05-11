import Image from 'next/image'
import React from 'react'

const Hero = ({ header, text, image }) => {
    return (
        <div className='flex items-center w-full justify-between'>
            <div className='flex flex-col gap-6'>
                <h2 className='text-[60px] leading-[70px] font-semibold w-[621px]'>
                    {header}
                </h2>
                <p className='text-[#000000] text-[24px] w-[606px] leading-[40px] font-normal'>
                    {text}
                </p>
            </div>
            <Image src={image} alt="Pastors" width={661} height={350} className='' />
        </div>
    )
}

export default Hero