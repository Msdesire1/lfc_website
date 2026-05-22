
import React from 'react'
import Link from 'next/link'

const NewHere = () => {
    return (
        <div className="py-12 px-4 md:px-10 flex flex-col items-center gap-6 bg-[#F9F9F9] lg:px-20">
            <div className="flex flex-col gap-[16px] w-full items-center">
                <h2 className="text-[30px] font-semibold text-[#121212]">
                    New Here?
                </h2>

                <p className='text-[#000000CC] text-[16px] font-normal'>
                    Join a family where faith grows and lives are transformed.
                </p>
            </div>

            <div className='grid lg:grid-cols-2 w-full gap-6 md:grid-cols-1'>

                {/* Left Side */}
                <div className='flex flex-col gap-[25px] w-full'>

                    {/* Need Prayer */}
                    <Link href="https://t.me/+LNIVt-0iDflkMzg0">
                        <div
                            className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end pb-6 bg-cover bg-center cursor-pointer hover:scale-[1.02] transition duration-300"
                            style={{ backgroundImage: `url("/hand.svg")` }}
                        >
                            <h2 className="text-[40px] font-semibold text-[#FDFDFD] px-6">
                                Need Prayer
                            </h2>
                        </div>
                    </Link>

                    {/* Accepted Jesus */}
                    <Link href="@lfcwwilr@yahoo.com ">
                        <div
                            className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end pb-6 bg-cover bg-center cursor-pointer hover:scale-[1.02] transition duration-300"
                            style={{ backgroundImage: `url("/pray.svg")` }}
                        >
                            <h2 className="text-[40px] font-semibold text-[#FDFDFD] px-6">
                                Just Accepted Jesus
                            </h2>
                        </div>
                    </Link>

                </div>

                {/* Right Side */}
                <Link href="@fcwwilr@yahoo.com ">
                    <div
                        className="relative rounded-xl overflow-hidden shadow-lg min-h-[654px] flex flex-col justify-end pb-6 bg-cover bg-center cursor-pointer hover:scale-[1.02] transition duration-300"
                        style={{ backgroundImage: `url("/share.svg")` }}
                    >
                        <h2 className="text-[40px] font-semibold text-[#FDFDFD] px-6">
                            Share a Testimony
                        </h2>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default NewHere