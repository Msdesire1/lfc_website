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
 name: "Pastor Christian Femi Ekpekhio",
            role: "Assistant Residence Pastor"
        },

         {
            image: "/pastor2.svg",
 name: "Pastor Salami Opeyemi",
            role: "Associate Pastor"
        },
    ]
    return (
        <div className='flex flex-col gap-16 mb-12 flex flex-col px-4 md:px-10 mt-28 lg:px-20 w-full items-center gap-[20px]'>
            <div className='flex items-center lg:flex-row flex-col w-full justify-between'>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[40px] font-semibold'>
                        OUR STATE PASTOR
                    </h2>
<p className='text-[#000000] text-[14px] font-normal  lg:w-[600px]'>
  Pastor Kayode Martins currently serves as the State and Resident Pastor of Living Faith Church, New Jerusalem, Ilorin, following his transfer to Ilorin in August 2025. A devoted servant of God, he is passionately committed to the preaching of the Word and the advancement of the liberation mandate. <br /><br />

Through his teachings and leadership, many lives have continued to experience transformation, restoration, and spiritual growth. His ministry is centered on faith, kingdom service, and raising believers to fulfil their glorious destinies in Christ. <br /><br />

Pastor Kayode Martins remains dedicated to serving God wholeheartedly, impacting lives, and advancing the kingdom of God in Ilorin and beyond, in line with the divine vision delivered to Bishop David Oyedepo.

</p>

                </div>
                <Image src="/pkm.jpg" alt="Pastors" width={500} height={500} className=' rounded-[32px]' />
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