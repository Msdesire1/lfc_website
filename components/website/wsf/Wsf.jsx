import Image from 'next/image'
import React from 'react'

const Wsf = () => {
  return (
    <div>
 <section
  className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/mainchurchus.svg')",
  }}
>

  {/* Top Left Small Preview */}
  <div className="absolute top-2 left-4 z-20">
    <div className="overflow-hidden border border-white/10 shadow-lg">
      <img
        src="/images/giving-bg.jpg"
        alt="preview"
        className="
          object-cover opacity-80 "
      />
    </div>
  </div>
  {/* Main Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-4">
    <div className="max-w-2xl text-center text-white pt-20">
  <h1 className="mb-3 text-[60px] font-bold md:text-[30px">
        Winners Satellite Fellowship
      </h1>
  <p className="mx-auto mb-8 max-w-xl text-[24px] leading-7 text-gray-200 md:text-base">
        “For where two or three are gathered together in My name, I am<br/> there in the midst of them.” Matt. 18:20.
      </p>
    </div>
  </div>
</section>


 <section className="w-full py-20 px-6 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h2 className="lg:text-[35px] font-semibold leading-tight text-[#1e1e1e] text-xl">
            Winners Satellite Fellowship
          </h2>

          <div className="space-y-4 text-[15px] leading-8 text-[#333333] md:text-base">
            <p>
              Acts 2:46 (King James Version KJV)
              “And they, continuing daily with one accord in the temple, and
              breaking bread from house to house, did eat their meat with
              gladness and singleness of heart.”
            </p>

            <p>
              The advent of megachurches and the busyness of the times have
              resulted in a church with faceless members where people are being
              taught but not being touched. The Church has consequently become
              a large ocean with drowning members.
            </p>

            <p>
              The Winners Satellite Fellowship (WSF) is set to create a forum
              for a caring fellowship where every member of the Church is
              adequately cared for.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/wsf.svg"
            alt="Winners Satellite Fellowship"
            width={700}
            height={500}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>

     <section className="w-full py-20 px-6 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

   {/* RIGHT IMAGE */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/wsfone.svg"
            alt="Winners Satellite Fellowship"
            width={600}
            height={500}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            priority
          />
        </div>




        {/* LEFT CONTENT */}
        <div className="space-y-6">
  <h2 className="lg:text-[35px] font-semibold leading-tight text-[#1e1e1e] text-xl">
          Winners Satellite Fellowship Objectives
          </h2>

          <div className="space-y-4 text-[15px] leading-8 text-[#333333] md:text-base">
            <p>
<ol className="list-decimal list-inside">
  <li>To Care – Hearts of compassion</li>
  <li> To Feed – Nourished and balanced saints</li>
  <li> To Teach – Knowledge and enlightenment</li>
  <li>To Lead – Leading leaders.</li>
</ol>
      </p>

            <p>
               After the order of the 1st century New Testament church, the WSF is out to care, feed and nourish the members. <br/> The WSF is set to create a forum for a caring fellowship where every member of the Church is adequately cared for.
 The WSF brings Jesus to your doorstep with the following results:
            </p>

            <p>
             <ol className="list-decimal list-inside">
  <li>Undeniable signs and wonders </li>
  <li>Life-changing experiences</li>
  <li>  Christian care and loving interactions </li>
  <li> Destiny moulding teaching and much more in a non-denominational environment</li>
</ol>
            </p>
          </div>
        </div>


      </div>
    </section>



 <section className="w-full py-20 px-6 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h2 className="lg:text-[35px] font-semibold leading-tight text-[#1e1e1e] text-xl">
            Meeting Times
          </h2>

          <div className="space-y-4 text-[15px] leading-8 text-[#333333] md:text-base">
             <p>
           <span className='font-bold'>Date:</span> Every Saturday
            </p>

            <p>
                <span className='font-bold'>Time:</span> 5:00pm – 6:00pm

            </p>

             <p>
                Please contact the WSF Central Team for more information on the meeting location and other details.

            </p>

             <p>
                <span className='font-bold'>Email:</span>lfcwwilr@yahoo.com
            </p>

            <p>
              <span className='font-bold'>Phone:</span>07013224718
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/wsftwo.svg"
            alt="Winners Satellite Fellowship"
            width={700}
            height={500}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>



    </div>
  )
}

export default Wsf