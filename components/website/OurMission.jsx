import Image from 'next/image'
import React from 'react'

const OurMission = () => {
    return (
        <div className='py-8 px-4 md:px-10 flex items-center justify-between lg:px-20'>
            <div>
                <h2 className='text-[#000000] text-[40px] font-semibold'>
                    Our Mission
                </h2>
                <div className='mt-6 flex flex-col gap-4'>
                    <p className='w-[707px] text-[16px] font-normal'>
                        Our Mandate for ministry was received from the LORD Himself in an 18-hour vision. During this vision, a commission was received from the LORD to liberate mankind in all facets of human existence, to restore broken destinies, and to bring healing to the sick and brokenhearted.
                    </p>
                    <div>
                        <span className='text-[16px] font-semibold'>
                            This was the Divine mandate received from the LORD:
                        </span>
                        <p className='w-[707px] text-[16px] font-normal'>
                            “The hour has come to liberate the world from all oppressions of the devil through the preaching of the word of faith, and I am sending you to undertake this task.”
                        </p>
                    </div>
                    <p className='w-[707px] text-[16px] font-normal'>
                        Today, testimonies of liberation through our messages, books, tapes, magazines and other periodicals are most humbling. The word of faith is working like fire for the liberation of mankind across the nations.
                    </p>
                </div>
            </div>

            <div>
                <Image src="/mission.svg" alt="Our Mission" width={638} height={404} className='h-auto object-cover rounded-lg' />
            </div>
        </div>
    )
}

export default OurMission