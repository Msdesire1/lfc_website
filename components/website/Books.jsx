




import Image from "next/image";
import React from "react";

const Books = () => {
  const books = [
    {
      image: "/di.png",
      name: "Following The Path Of The Eagle",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/following-the-path.pdf",
    },
    {
      image: "/dii.png",
      name: "In Pursuit of  vision",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/in-pusuit.pdf",
    },
    {
      image: "/diii.png",
      name: "Understanding Divine Direction",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/understanding-divine-direcion.pdf",
    },
    {
      image: "/diiii.png",
      name: "The Breakingthrough Power of Vision",
      author: "Bishop David Oyedepo",
      pdf: "/pdfs/break-power.pdf",
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