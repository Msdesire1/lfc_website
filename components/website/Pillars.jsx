import Image from 'next/image'
import React from 'react'

const Pillars = () => {

    const pillars = [
        {
            name: "Prosperity Entrance",
            dsscription: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.” – 3 John 2, Ps. 35:27, Zech. 1:17"
        },
        {
            name: "Faith Entrance",
            dsscription: "For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith.”  – 1 John 5:4, Eph. 6:16"
        },
        {
            name: "Sucess Entrance",
            dsscription: "For whatsoever is born of God overcometh the world: and this This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.”  – Joshua 1: 8-10is the victory that overcometh the world, even our faith.”  – 1 John 5:4, Eph. 6:16"
        },
        {
            name: "The Word Entrance",
            dsscription: "Who being the brightness of his glory, and the express image of his person, and upholding all things by the word of his power, when he had by himself purged our sins, sat down on the right hand of the Majesty on high.” – Heb. 1:3, John 1:1-12"
        },
        {
            name: "Prayer Entrance",
            dsscription: "And this is the confidence that we have in him, that, if we ask anything according to his will, he heareth us.” – 1 John 5:14"
        },
        {
            name: "Vision Entrance",
            dsscription: "Where there is no vision, the people perish: but he that keepeth the law, happy is he.” – Prov. 29:18, Jer. 29:11"
        },
        {
            name: "Supernatural Entrance",
            dsscription: "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.” – John 3:8, Ps. 82:5-7"
        },
        {
            name: "Healing Entrance",
            dsscription: "That it might be fulfilled which was spoken by Esaias the prophet, saying, Himself took our infirmities, and bare our sicknesses.” – Matt. 8:17, Isaiah 53:3-4; Jer. 8:22"
        },
        {
            name: "Consecration Entrance",
            dsscription: "Nevertheless the foundation of God standeth sure, having this seal, the Lord knoweth them that are his. And let every one that nameth the name of Christ depart from iniquity. ” – 2 Tim. 2:19, Hebrews12:14"
        },
        {
            name: "The Holy Spirit Entrance",
            dsscription: "And it shall come to pass in that day, that his burden shall be taken away from off thy shoulder, and his yoke from off thy neck, and the yoke shall be destroyed because of the anointing.” – Isaiah 10:27, Acts 1:1-8"
        },
        {
            name: "Wisdom Entrance",
            dsscription: "And wisdom and knowledge shall be the stability of thy times, and strength of salvation: the fear of the Lord is his treasure.” – Isaiah 33:6, Prov. 24:3-4"
        },
        {
            name: "Praise Entrance",
            dsscription: "And when they began to sing and to praise, the Lord set ambushments against the children of Ammon, Moab, and mount Seir, which were come against Judah: and they were smitten.” – 2 Chro. 20:22, Ps. 67:1-7; 149:1-9"
        },
    ]
  return (
    <div className="py-8 px-4 md:px-10 lg:px-16">
        <h2 className="text-[50px] font-semibold mb-8 text-[#000]">The 12 Pillars of Our Faith</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
                <div key={index} className="bg-[#F5F5F5] px-3 py-6 min-h-[258px] rounded-lg shadow-md">
                    <Image src={`/cross.svg`} alt={pillar.name} width={40} height={40} className="mb-4" />
                    <h3 className="text-xl font-medium mb-2">{pillar.name}</h3>
                    <p className="text-[14px] font-normal text-black">{pillar.dsscription}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Pillars