// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const Books = () => {
//     const books = [
//         {
//             image: "/the.png",
//             name: "Church Growth Manual",
//             author: "Bishop David Oyedepo"
//         },
//         {
//             image: "/booksnew.jpg",
//             name: "The Wisdom That Works",
//             author: "Bishop David Oyedepo"
//         },
//         {
//             image: "/booksnewi.jpg",
//             name: "Understanding Financial Stewardship",
//             author: "Bishop David Oyedepo"
//         },
//         {
//             image: "/book4.svg",
//             name: "Understanding the Power of Faith",
//             author: "Bishop David Oyedepo"
//         }
//     ]
//   return (
//     <div className="py-12 px-4 md:px-10 flex flex-col gap-6 bg-[#F9F9F9] lg:px-20">
//         <h2 className="lg:text-[30px] font-semiboldlg:w-[587px] leading-12 mb-8 text-[#000] text-center justify-center mx-auto">
//             Recommended Book of The Months
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {books.map((book, idx) => (
//                 <div key={idx} className="flex flex-col gap-2.5">
//                     <Image height={50} width={250} src={book.image} alt={book.name} className="" />
//                     <h3 className="text-[14px] font-semibold text-[#121212]">{book.name}</h3>
//                     <p className="text-[12px] font-normal text-[#12121299]">{book.author}</p>
//                     <Link href={"/website/books"} className='border  text-[16px] text-center justify-center flex font-normal cursor-pointer border-[#121212] rounded-[12px] h-[40px]'>
//                         Read
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Books




import Image from "next/image";
import React from "react";

const Books = () => {
  const books = [
    {
      image: "/the.png",
      name: "The Force of Freedom",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/the-force-freedom.pdf",
    },
    {
      image: "/booksnew.jpg",
      name: "Born to Win",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/born-to-win.pdf",
    },
    {
      image: "/booksnewi.jpg",
      name: "Satan Get Lost",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/satan-get-lost.pdf",
    },
    {
      image: "/book4.svg",
      name: "Understanding the Power of Faith",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/power-of-faith.pdf",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 ">
      <h2 className="text-2xl lg:text-[30px] font-semibold text-center mb-10">
        Recommended Book of The Month
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[12px] shadow-sm p-4 flex flex-col"
          >
            <div className="relative w-full h-[350px] overflow-hidden rounded-lg">
              <Image
                src={book.image}
                alt={book.name}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="mt-4 text-[16px] font-semibold text-[#121212]">
              {book.name}
            </h3>

            <p className="text-[14px] text-[#12121299] mb-4">
              {book.author}
            </p>

<div className="mt-auto flex gap-2">
  <a
    href={"/website/books"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center h-8 text-[14px] rounded-[12px] border border-[#bab4b4]"
  >
    Read More
  </a>

  <a
    href={book.pdf}
    download
    className="flex-1 flex items-center justify-center h-8 text-[14px] rounded-[12px] bg-black text-white"
  >
    Download
  </a>
</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Books;