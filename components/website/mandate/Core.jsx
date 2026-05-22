'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Core = () => {
    const [isInView, setIsInView] = useState(false)
    const [ref, setRef] = React.useState(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                }
            },
            { threshold: 0.1 }
        )

        if (ref) {
            observer.observe(ref)
        }

        return () => {
            if (ref) {
                observer.unobserve(ref)
            }
        }
    }, [ref])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    const imageVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    }
    return (
        <div
            ref={setRef}
            className="pb-12 px-4 sm:px-6 md:px-10 flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:px-20"
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className='text-3xl sm:text-4xl md:text-5xl lg:text-[30px] text-[#000000] font-bold text-center'
            >
                OUR CORE MANDATE
            </motion.h2>
            <div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className='w-full flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-[50px] justify-between'
            >
                <Image width={600} height={544} src="/depo.svg" alt="core" className='object-cover' />
                <div className='flex flex-col gap-[32px]'>
                    <h2 className='text-[#000000] text-[16px] font-normal'>
                        Our Core Mandate speaks of liberation in all facets of human existence. <br />
                        We focus mainly on transforming destinies that have been afflicted, <br /> battered, beaten, tattered, deformed and subsequently in groaning and <br /> agonies, as a result of pains, pangs and crying. <br />
                        This is the mandate…
                    </h2>
                    <div>
                        <Image width={40} height={40} src="/apos.svg" alt="quote" className='object-cover' />
                        <h2 className='text-[#121212] text-[16px] font-semibold'>
                            The hour has come to Liberate the World from all oppression of the devil through the Preaching of the Word of Faith, and I am sending you to undertake this task.
                        </h2>
                    </div>
                    <h2 className='text-[#000000] text-[16px] font-normal'>
                        Today, testimonies of liberation through our messages, books, tapes, <br /> magazines and other periodicals are most humbling. <br />
                        The Word of Faith is working like fire for the Liberation of <br /> Mankind across the nations.
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Core