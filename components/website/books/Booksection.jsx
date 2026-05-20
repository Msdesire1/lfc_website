"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const books = [
  {
    id: 1,
    title: "Church Growth Manual",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book1.svg",
  },
  {
    id: 2,
    title: "Wisdom That Works",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book2.svg",
  },
  {
    id: 3,
    title: "Understanding Financial Stewardship",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book3.svg",
  },
  {
    id: 4,
    title: "Towards Increasing Impact in Ministry",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book4.svg",
  },
  {
    id: 5,
    title: "A Believer’s Guide to Effective Fasting and Prayer",
    author: "David & Faith Oyedepo",
    price: "3000",
    image: "/book5.png",
  },
  {
    id: 6,
    title: "Treasures of Life Vol 4",
    author: "Bishop David Oyedepoo",
    price: "3000",
    image: "/book6.png",
  },
  {
    id: 7,
    title: "Treasures of Life Vol 3",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book7.png",
  },
  {
    id: 8,
    title: "Treasures of Life Vol 2",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book8.png",
  },
  {
    id: 9,
    title: "Treasures of Life",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book9.png",
  },
  {
    id: 10,
    title: "Snapshots of My Adventure in Ministry",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book10.webp",
  },
  {
    id: 11,
    title: "The Wonders of Salvation",
    author: "Pastor Faith A. Oyedepo",
    price: "3000",
    image: "/book11.png",
  },
  {
    id: 12,
    title: "Winning Prayer",
    author: "Bishop David Oyedepo",
    price: "3000",
    image: "/book12.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Booksection() {
  return (
    <section className="w-full  py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#EC3237] uppercase tracking-[4px] lg:text-[40px]  text-[14px] font-semibold">
            Recommended Books
          </p>

          <h2 className="mt-4 lg:text-[30px] text-[14px] font-bold text-gray-900 leading-tight">
            Inspiring Christian Books
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-[#EC3237] mx-auto mt-5 rounded-full"
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group text-center"
            >
              {/* Book Card */}
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl transition-all duration-500">
                {/* Floating Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-10" />

                {/* Book Image */}
                <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Hover Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  <button className="bg-white text-black px-5 py-3 rounded-full font-semibold hover:bg-[#EC3237] hover:text-white transition-all duration-300 shadow-lg">
                    View Book
                  </button>
                </motion.div>
              </div>

              {/* Text */}
              <div className="mt-5">
                <p className="text-sm text-gray-500">{book.author}</p>

                <h3 className="mt-2 text-[17px] font-bold leading-snug text-gray-900 group-hover:text-[#EC3237] transition duration-300">
                  {book.title}
                </h3>

                <motion.p
                  whileHover={{ scale: 1.05 }}
                  className="mt-2 text-[#EC3237] font-semibold"
                >
                  {book.price}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center mt-20"
        >
{/* Contact Info */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="mt-10 text-center"
>
  <p className="text-black lg:text-[20px] text-[14px] font-medium">
    For more informations kindly call{" "}
    <span className="text-[#EC3237] font-bold">
      Pastor Babatunde
    </span>
  </p>

  <a
    href="tel:+234 813 073 5584"
    className="inline-block mt-3 text-black font-semibold hover:text-[#c5a46d] transition duration-300"
  >
    +234 813 073 5584
  </a>
</motion.div>
        </motion.div>
      </div>
    </section>
  );
}