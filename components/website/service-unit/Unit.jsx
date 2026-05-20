import React from 'react'

const Unit = () => {
  return (
    <div
      className="py-12 px-4 md:px-10 flex flex-col gap-4 items-center justify-center h-screen text-[40px] font-semibold text-[#FDFDFD] bg-cover bg-center lg:px-16"
      style={{ backgroundImage: `url("/unit.svg")` }}
    >
      <h2 className='lg:w-[752px] text-white text-[60px] font-normal text-center leading-[70px]'>
        Ministry Opportunities at Winners Chapel
      </h2>
      <p className='lg:w-[625px] text-[#FFFFFFCC] text-[16px] font-normal text-center'>
        At Winners Chapel, ministry is where you grow, serve, and connect. Discover opportunities to use your gifts, support the church, and be part of something meaningful.
      </p>
    </div>
  )
}

export default Unit