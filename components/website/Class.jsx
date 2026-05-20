import Image from "next/image";
import React from "react";

const Class = () => {
    return (
        <div className="w-full bg-[#F5F5F5] py-16 px-4 md:px-10 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* Left Image */}
                <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                    <Image
                        src="/bfc.png"
                        alt="Believers Foundation Class"
                        width={700}
                        height={900}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                </div>

                {/* Right Content */}
                <div className="flex flex-col gap-8">

                    {/* Heading */}
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-[40px] md:text-[52px] font-bold text-[#EC3237] leading-tight">
                            Believers&apos;
                        </h2>

                        <h2 className="text-[40px] md:text-[52px] font-light text-[#1E1E1E] leading-tight">
                            Foundation Class
                        </h2>
                    </div>

                    {/* Intro Text */}
                    <p className="text-black text-[18px] leading-[42px] font-light">
                        The Believers&apos; Foundation Class and Membership Classes at
                        Living Faith Church (Winners Chapel) is a platform for all
                        new believers and first-time worshippers to be established
                        in the faith.
                    </p>

                    <p className="text-black text-[18px] leading-[42px] font-light">
                        In this class, new members are inducted into the principles
                        and Christian beliefs of the ministry. Everyone is encouraged
                        to attend and become grounded in the Word of God.
                    </p>

                    {/* Courses */}
                    <div className="flex flex-col gap-5">

                        <h3 className="text-[28px] font-semibold text-[#121212]">
                            Courses Covered
                        </h3>

                        <div className="flex flex-col gap-4">

                            {[
                                "WORD FOUNDATION",
                                "EFFECTIVE PRAYER LIFE",
                                "KINGDOM STEWARDSHIP",
                                "HOLY GHOST BAPTISM",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#EC3237] text-white flex items-center justify-center font-semibold">
                                        {index + 1}
                                    </div>

                                    <p className="text-[#5C5C5C] text-[18px] font-medium">
                                        {item}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Bottom Text */}
                    <p className="text-black text-[18px] leading-[42px] font-light">
                        Every growth-thirsty Christian should seek to attend the
                        Believers Class. It helps to create a solid spiritual
                        foundation that is strong enough to withstand the challenges
                        of life.
                    </p>

                    {/* Button */}
                    <div>
                        <button className="bg-[#EC3237] hover:bg-[#EC3237] transition duration-300 text-white px-8 py-4 rounded-xl text-[16px] font-semibold shadow-md hover:scale-105">
                            Join Foundation Class
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Class;