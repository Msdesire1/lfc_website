import React from 'react'

const NewHere = () => {
    return (
        <div className="py-12 px-4 md:px-10 flex flex-col items-center gap-6 bg-[#F9F9F9] lg:px-16">
            <div className="flex flex-col gap-[16px] w-full items-center">
                <h2 className="text-[40px] font-semibold text-[#121212]">
                    New Here?
                </h2>
                <p className='text-[#000000CC] text-[16px] font-normal'>
                    Join a family where faith grows and lives are transformed.
                </p>
            </div>
            <div className='grid lg:grid-cols-2 w-full gap-6 md:grid-cols-1'>
                <div className='flex flex-col gap-[25px] w-full'>
                    <div
                        className="relative rounded-xl overflow-hidden shadow-lg min-h-[480px] flex flex-col justify-end pb-6 bg-cover bg-center"
                        style={{ backgroundImage: `url("/hand.svg")` }}>
                        <h2 className="text-[40px] font-semibold text-[#FDFDFD] px-6">
                            Need Prayer
                        </h2>
                    </div>
                    <div
                        className="relative rounded-xl overflow-hidden shadow-lg min-h-[480px] flex flex-col justify-end pb-6 bg-cover bg-center"
                        style={{ backgroundImage: `url("/pray.svg")` }}>
                        <h2 className="text-[40px] font-semibold text-[#FDFDFD] px-6">
                            Just Accepted Jesus
                        </h2>

                    </div>
                </div>
                <div
                    className="relative rounded-xl overflow-hidden shadow-lg min-h-[984px] flex flex-col justify-end pb-6 bg-cover bg-center"
                    style={{ backgroundImage: `url("/share.svg")` }}>
                    <h2 className="text-[40px] font-semibold text-[#FDFDFD] px-6">
                        Share a Testimony
                    </h2>

                </div>
            </div>
        </div>
    )
}

export default NewHere