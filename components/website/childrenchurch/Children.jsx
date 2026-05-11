import React from 'react'
import Hero from '../Reuseable/Hero'

const Children = () => {
  return (
    <div className='flex flex-col gap-16 mb-12 flex flex-col px-4 md:px-10 mt-28 lg:px-16 w-full items-center gap-[40px]'>
      <Hero
        header={"Growing in Faith, Finding Your Voice"}
        text={"A supportive space where teens can explore their faith, build confidence, and navigate life with guidance and truth."}
        image={"/children.svg"}
      />

    </div>
  )
}

export default Children