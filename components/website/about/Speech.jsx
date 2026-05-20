import Image from 'next/image'
import React from 'react'

const Speech = () => {
    return (
        <div>
            <div className="py-20 px-4 md:px-10 flex items-center gap-12 justify-between lg:px-20">
                <span className='text-[18px] font-normal w-[750px] text-[#121212]'>
Welcome to the Living Faith Church New Jerusalem, Ilorin a divine vision and a landmark sanctuary dedicated to the advancement of God’s kingdom and the spread of the Word of Faith. As an arm of the Living Faith Church Worldwide, under the leadership of Bishop David Oyedepo, our mandate remains the liberation of mankind from every oppression of the devil through the preaching of the Word of Faith.<br/><br/>

For over years, the LFC New Jerusalem Church in Ilorin has stood as a symbol of faith, sacrifice, dedication, and unwavering commitment to God’s vision. This glorious sanctuary is being built to serve as a spiritual home where lives will be transformed, destinies restored, and generations empowered to live victoriously in Christ.<br/><br/>

The LFC New Jerusalem church  is more than just a church building  it is a prophetic landmark designed to accommodate thousands of worshippers, raise kingdom ambassadors, and provide an atmosphere where the presence and power of God will be experienced mightily. Through this divine project, countless souls shall encounter salvation, healing, breakthroughs, and supernatural restoration.
                </span>
                <Image src="/speech.svg" alt="Speech" width={600} height={450} className='h-auto rounded-[20px] object-cover' />
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