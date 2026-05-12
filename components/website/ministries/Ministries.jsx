import Image from 'next/image'
import React from 'react'

const Ministries = () => {
  return (
    <div>
 <div className="pb-12 mt-36 px-4 md:px-10 flex items-center gap-12 justify-between lg:px-20">
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-[60px] font-semibold text-[#000000]'  >
         One Church, Many Expressions of Faith
        </h2>
        <span className='text-[24px] font-normal  text-[#121212]'>
At Winners Chapel, every age group is nurtured through a dedicated ministry designed to support spiritual growth, build strong community, and make learning God’s word relatable at every stage of life.
        </span>
      </div>

      <Image width={600} height={486} src="/mainch.svg" alt="mandate" className='object-cover' />
    </div>
    <div className='py-10 justify-center items-center flex'>
<h1 className='font-bold text-[40px] text-center'> Explore Our Church <br/> Ministries</h1>
    </div>

{/* 1 */}
<section className="w-full py-10">
  <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
    {/* Text Content */}
    <div className="flex justify-center">
      <div className="max-w-md text-center">
        <h2 className="mb-5 text-2xl font-bold text-[#111111] md:text-3xl">
          Adult Church
        </h2>

        <p className="text-sm leading-7 text-gray-600 md:text-base text-center">
          A space for spiritual growth, deeper understanding of God’s
          word, and active participation in church life. Here, adults are
          equipped to strengthen their faith, build meaningful
          relationships, and live out godly principles in their daily
          lives.
        </p>
      </div>
    </div>

    {/* Image */}
    <div className="flex justify-center lg:justify-end">
      <div className="overflow-hidden rounded-md">
        <img
          src="/mainone.svg"
          alt="Adult Church"
          className="h-[356px] w-full max-w-[600px] object-cover"
        />
      </div>
    </div>
  </div>
</section>
{/* 2 */}
<section className="w-full py-10">
  <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

 <div className="flex justify-center lg:justify-start">
      <div className="overflow-hidden rounded-md">
        <img
          src="/theyouth.svg"
          alt="Adult Church"
          className="h-[356px] w-full max-w-[600px] object-cover"
        />
      </div>
    </div>

  {/* Text Content */}
    <div className="flex justify-center">
      <div className="max-w-md text-center">
        <h2 className="mb-5 text-2xl font-bold text-[#111111] md:text-3xl">
          Youth Church
        </h2>

        <p className="text-sm leading-7 text-gray-600 md:text-base text-center">
A vibrant community designed to help young people discover purpose, grow in their relationship with God, and navigate life with clarity and confidence. It’s a place to connect, learn, and be empowered to make impactful decisions.
        </p>
      </div>
    </div>
</div>
</section>
{/* 3 */}
<section className="w-full py-10">
  <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
    {/* Text Content */}
    <div className="flex justify-center">
      <div className="max-w-md text-center">
        <h2 className="mb-5 text-2xl font-bold text-[#111111] md:text-3xl">
Teens church
        </h2>

        <p className="text-sm leading-7 text-gray-600 md:text-base text-center">
         A supportive and engaging environment where teenagers can build a strong foundation in faith while developing character, confidence, and a sense of identity. It encourages open learning, guidance, and connection with like-minded peers.
        </p>
      </div>
    </div>

    {/* Image */}
    <div className="flex justify-center lg:justify-end">
      <div className="overflow-hidden rounded-md">
        <img
          src="/theteen.svg"
          alt="Adult Church"
          className="h-[356px] w-full max-w-[600px] object-cover"
        />
      </div>
    </div>
  </div>
</section>
{/* 2 */}
<section className="w-full py-10 pb-20">
  <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
 <div className="flex justify-center lg:justify-start">
      <div className="overflow-hidden rounded-md">
        <img
          src="/thekids.svg"
          alt="Adult Church"
          className="h-[356px] w-full max-w-[600px] object-cover"
        />
      </div>
    </div>

  {/* Text Content */}
    <div className="flex justify-center">
      <div className="max-w-md text-center">
        <h2 className="mb-5 text-2xl font-bold text-[#111111] md:text-3xl">
Children Church
        </h2>

        <p className="text-sm leading-7 text-gray-600 md:text-base text-center">
A fun, safe, and nurturing space where children are introduced to God’s word in simple and engaging ways. Through interactive teaching and care, they begin to understand faith, values, and how to grow in God’s love.
        </p>
      </div>
    </div>
</div>
</section>

    </div>
  )
}

export default Ministries