import Image from 'next/image'
import React from 'react'

const Books = () => {
    const books = [
        {
            image: "/book1.svg",
            name: "Church Growth Manual",
            author: "Bishop David Oyedepo"
        },
        {
            image: "/book2.svg",
            name: "The Wisdom That Works",
            author: "Bishop David Oyedepo"
        },
        {
            image: "/book3.svg",
            name: "Understanding Financial Stewardship",
            author: "Bishop David Oyedepo"
        },
        {
            image: "/book4.svg",
            name: "Understanding the Power of Faith",
            author: "Bishop David Oyedepo"
        }
    ]
  return (
    <div className="py-12 px-4 md:px-10 flex flex-col gap-6 bg-[#F9F9F9] lg:px-16">
        <h2 className="text-[40px] font-semibold w-[587px] leading-12 mb-8 text-[#000]">
            Recommended Book of The Month
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book, idx) => (
                <div key={idx} className="flex flex-col gap-2.5">
                    <Image height={538} width={382} src={book.image} alt={book.name} className="" />
                    <h3 className="text-xl font-semibold text-[#121212]">{book.name}</h3>
                    <p className="text-[12px] font-normal text-[#12121299]">{book.author}</p>
                    <button className='border text-[16px] font-normal cursor-pointer border-[#121212] rounded-[8px] h-[40px]'>
                        Read
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Books