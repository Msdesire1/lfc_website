import React from 'react'

const About = () => {
  return (
    <div
      className="py-12 px-4 md:px-10 flex items-center justify-center h-screen text-[40px] font-semibold text-[#FDFDFD] bg-cover bg-center lg:px-20"
      style={{ backgroundImage: `url("/church.svg")` }}
    >
      <h2 className='w-[551px] text-white text-[60px] font-normal text-center leading-[70px]'>
        In Christ, For Christ,
        With Joy!
      </h2>
    </div>
  )
}

export default About