import React from 'react'

const ServiceTime = () => {
    const time = [
        {
            name: "Sunday Worship Service",
            time1: "1st Service - 7:00AM",
            time2: "2nd Service - 9:00AM",
            image: "/timeone.svg"
        },
        {
            name: "Midweek Communion Service",
            time1: "Wednesday – 4:30 PM",
            image: "/timetwo.svg"
        },
        {
            name: "Winners Satellite Fellowqship",
            time1: "Saturdays – 5:00 PM",
            image: "/timethree.svg"
        },
        {
            name: "Convenant Hour of Prayer",
            time1: "Tue. – Sat 6:00 – 7:00AM",
            image: "/timefout.svg"
        }
    ]
    return (
        <div className="py-8 px-4 md:px-10 lg:px-16">
            <h2 className="text-[40px] font-semibold text-center mb-8 text-[#000]">Service Times</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {time.map((item, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-xl overflow-hidden shadow-lg min-h-[474px] flex flex-col justify-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div className="p-4 flex flex-col items-center text-white">
                            <h3 className="font-semibold text-[20px] mb-2">{item.name}</h3>
                            <p className="text-[16px] text-[#FDFDFD] font-normal">{item.time1}</p>
                            {item.time2 && <p className="text-[16px] text-[#FDFDFD] font-normal">{item.time2}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServiceTime