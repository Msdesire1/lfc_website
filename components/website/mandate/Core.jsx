import Image from 'next/image'
import React from 'react'

const Core = () => {
    return (
        <div className="pb-12 px-4 md:px-10 flex flex-col items-center gap-12 lg:px-16">
            <h2 className='text-[60px] text-[#000000]'>
                OUR CORE MANDATE
            </h2>
            <div className='flex items-center gap-[50px] justify-between'>
                <Image width={620} height={544} src="/depo.svg" alt="core" className='object-cover' />
                <div className='flex flex-col gap-[32px]'>
                    <h2 className='text-[#000000] text-[20px] font-normal'>
                        Our Core Mandate speaks of liberation in all facets of human existence. <br />
                        We focus mainly on transforming destinies that have been afflicted, <br /> battered, beaten, tattered, deformed and subsequently in groaning and <br /> agonies, as a result of pains, pangs and crying. <br />
                        This is the mandate…
                    </h2>
                    <div>
                        <Image width={40} height={40} src="/apos.svg" alt="quote" className='object-cover' />
                        <h2 className='text-[#121212] text-[24px] font-semibold'>
                            The hour has come to Liberate the World from all oppression of the devil through the Preaching of the Word of Faith, and I am sending you to undertake this task.
                        </h2>
                    </div>
                    <h2 className='text-[#000000] text-[20px] font-normal'>
                        Today, testimonies of liberation through our messages, books, tapes, <br /> magazines and other periodicals are most humbling. <br />
                        The Word of Faith is working like fire for the Liberation of <br /> Mankind across the nations.
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Core