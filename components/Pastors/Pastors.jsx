import Image from 'next/image'
import React from 'react'

const Pastors = () => {
    const pastors = [
        {
            image: "/pastor1.svg",
            name: "Pastor Kayode Martins",
            role: "State/Residence Pastor"
        },
        {
            image: "/pastor3.svg",
            name: "Kemishola Animasahun",
            role: "Assistant Residence Pastor"
        },

         {
            image: "/pastor2.svg",
            name: "Kemishola Animasahun",
            role: "Associate Pastor"
        },
    ]
    return (
        <div className='flex flex-col gap-16 mb-12 flex flex-col px-4 md:px-10 mt-28 lg:px-16 w-full items-center gap-[20px]'>
            <div className='flex items-center w-full justify-between'>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[40px] font-semibold'>
                        OUR STATE PASTOR
                    </h2>
                    <p className='text-[#000000] text-[20px] font-normal'>
                        Pastor Kayode Martins is currently serving as the Resident <br /> Pastor of Living Faith Chapel, New Jerusalem. <br />
                        He is committed passionately to the preaching of the Word of <br /> God and teaching the principles of faith in fulfilment of destiny. <br />
                        In his assignment, he pursues doggedly the delivery of the <br /> liberation mandate in the life of everyone he comes in contact <br /> with. His message is centred on the liberation mandate as <br /> revealed to the Presiding Bishop, Dr. David O. Oyedepo by God in <br /> a vision over three decades ago
                    </p>
                </div>
                <Image src="/state.svg" alt="Pastors" width={500} height={400} className='' />
            </div>
            <div className="py-8 w-full flex flex-col items-center justify-center gap-[40px]">
                <h2 className="text-[40px] font-semibold text-center text-[#000]">Our Pastors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-3 gap-6">
                    {pastors.map((pastor, idx) => (
                        <div key={idx}
                            className="relative rounded-xl overflow-hidden shadow-lg min-h-[400px] flex flex-col pb-6 px-6 justify-end bg-cover bg-center"
                            style={{ backgroundImage: `url(${pastor.image})` }}
                        >
                            <h3 className="text-xl font-semibold text-[#FDFDFD]">{pastor.name}</h3>
                            <p className="text-[16px] font-normal text-[#FDFDFD]">{pastor.role}</p>
                        </div>
                    ))}
                </div>
                <Image src="/gather.svg" alt="Pastors" width={600} height={400} className='w-full' />
            </div>
        </div>
    )
}

export default Pastors