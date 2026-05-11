import Image from 'next/image'
import React from 'react'

const Speech = () => {
    return (
        <div>
            <div className="py-12 px-4 md:px-10 flex items-center gap-12 justify-between lg:px-16">
                <span className='text-[16px] font-normal w-[750px] text-[#121212]'>
                    Welcome to Winners Chapel International, Dartford European headquarters. We are an arm of the Living Faith Church Worldwide. Our vision, as delivered to the Presiding Bishop, Dr David Oyedepo, is to preach the Word of Faith, liberating men everywhere from every oppression of the devil. <br />
                    We are dedicated to accomplishing this task throughout the United Kingdom, and Europe at large.
                    Our church in London was officially inaugurated in 2002 to spread the Word of Faith and to bring the liberation mandate to the United Kingdom and Europe. We have experienced diverse testimonies as individuals and as a church ever since. We currently occupy a 1500 seater Campus in the district of Dartford, a Children’s Church capacity of 500 and Teens Church of 300 seating capacity where the Word of Faith is preached in our various services and the people of God are empowered to live a life of dominion.
                    <br />We are glad you have come to this website because we know your life will never be the same again. Take time to browse through the site and we know it would be a blessing to you. Also, join any of our weekly & Sunday services and as you come to visit us, God will meet you at every point of your need.
                </span>
                <Image src="/speech.svg" alt="Speech" width={690} height={536} className='h-auto rounded-[20px] object-cover' />
            </div>
            <div
                className="py-12 px-4 md:px-10 flex items-center justify-end h-[745px] text-[40px] font-semibold text-[#FDFDFD] bg-cover bg-center lg:px-16"
                style={{ backgroundImage: `url("/oye.svg")` }}
            >
                <div className='w-[847px] bg-white h-[639px] px-10 flex flex-col justify-center gap-[23px] rounded-[10px]'>
                    <h2 className='text-[#121212] text-[20px] font-semibold'>
                        THE PRESIDING BISHOP & FOUNDER
                    </h2>
                    <p className='text-[#000000CC] text-[16px] leading-[32px] font-normal'>
                        On September 27, 1954, Bishop David Olaniyi Oyedepo, a native of Omu-Aran, Kwara State, Nigeria, was <br /> born in Osogbo into a religiously mixed family. His father, Ibrahim, was a Muslim healer, while his <br /> mother, Dorcas, was a member of the Eternal Order of the Cherubim and Seraphim Movement (C&S). <br />
                        He was raised by his grandmother in Osogbo, who inculcated in him the virtues of Christian life <br /> through the early morning prayers which he attended with her. She also taught him the importance of <br /> tithing and other basic Christian virtues. <br />
                        David Oyedepo gave his life to Jesus Christ in 1969 through the influence of his former teacher, Ms <br /> Betty Lasher, who took a special interest in him during his high school days. He studied Architecture at <br /> Kwara State Polytechnic, Ilorin, and worked briefly with the Federal Ministry of Housing in Ilorin before <br /> resigning to concentrate on missionary work.  David Oyedepo also earned a PhD in Human <br /> Development from Honolulu University, Hawaii, United States of America. <br />
                        In 1982 he married Florence Abiola Akano (now known as Faith). They have four children together <br /> (David Jr., Isaac, Love, and Joy). David Jr. and Isaac Oyedepo were ordained as Pastors in May 2007 by <br /> Kenneth Copeland.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Speech