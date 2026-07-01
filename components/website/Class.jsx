import Image from "next/image";
import React from "react";

const Class = () => {
    return (
<>
        <div className="mx-auto max-w-7xl py-7  justify-around items-center gap-1 flex flex-col">
    <h2 className="text-[30px] font-semibold text-[#000] leading-tight">
        Believers&apos; Foundation Class
    </h2>
</div>
        <div className="w-full bg-[#F5F5F5] py-16 px-4 md:px-10 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* Left Image */}
                <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                    <Image
                        src="/believer.png"
                        alt="believer"
                        width={700}
                        height={980}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                </div>

                {/* Right Content */}
                <div className="flex flex-col gap-2">
  Believers Foundation Class
                    {/* Heading */}
                    <div className="flex flex-1 items-center gap-4">
                        <h2 className="lg:text-[30px] md:text-[50px] font-bold text-[#EC3237] leading-tight">
                            Believers&apos;
                        </h2>

                        <h2 className="lg:text-[30px] font-light text-[#1E1E1E] leading-tight">
                            Foundation Class
                        </h2>
                    </div>

                    {/* Intro Text */}
                    <p className="text-black text-[14px] font-light">
                        The Believers&apos; Foundation Class and Membership Classes at
                        Living Faith Church (Winners Chapel) is a platform for all
                        new believers and first-time worshippers to be established
                        in the faith.
                    </p>

                    <p className="text-black text-[14px] font-light">
                        In this class, new members are inducted into the principles
                        and Christian beliefs of the ministry. Everyone is encouraged
                        to attend and become grounded in the Word of God.
                    </p>

                    {/* Courses */}
                    <div className="flex flex-col gap-3">

                        <h3 className="text-[20px] font-semibold text-[#121212]">
                            Courses Covered
                        </h3>

                        <div className="flex flex-col gap-2">

                            {[
                                "BE COMMITTED TO FEEDING ON THE WORD ",
                                "THE FEAR OF THE LORD ",
                                "THE LOVE OF GOD ",
                                "UNDERSTANDING THE PLACE AND POWER OF FAITH ",
                                 "UNDERSTANDING THE POWER OF PRAYER",
                                "UNDERSTANDING THE BENEFITS OF SOUL WINNING ",
                                "WHY EVERY BELIEVER MUST BE BAPTISED IN THE HOLY GHOST",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 bg-white text-[12px] rounded-xl px-5 py-2 shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-5 h-5 rounded-full bg-[#EC3237] text-white flex items-center justify-center font-semibold">
                                        {index + 1}
                                    </div>

                                    <p className="text-[#5C5C5C] text-[14px] font-medium">
                                        {item}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Bottom Text */}
                    <p className="text-black text-[14px]  font-light">
                        Every growth-thirsty Christian should seek to attend the
                        Believers Class. It helps to create a solid spiritual
                        foundation that is strong enough to withstand the challenges
                        of life.
                    </p>

                </div>
            </div>
        </div>
</>
    );
};

export default Class;