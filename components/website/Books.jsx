import Image from 'next/image'
import Link from 'next/link'
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
    <div className="py-12 px-4 md:px-10 flex flex-col gap-6 bg-[#F9F9F9] lg:px-20">
        <h2 className="lg:text-[30px] font-semibold w-[587px] leading-12 mb-8 text-[#000]">
            Recommended Book of The Months
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book, idx) => (
                <div key={idx} className="flex flex-col gap-2.5">
                    <Image height={438} width={382} src={book.image} alt={book.name} className="" />
                    <h3 className="text-[14px] font-semibold text-[#121212]">{book.name}</h3>
                    <p className="text-[12px] font-normal text-[#12121299]">{book.author}</p>
                    <Link href={"/website/books"} className='border  text-[16px] text-center justify-center flex font-normal cursor-pointer border-[#121212] rounded-[12px] h-[40px]'>
                        Read
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Books