import React from 'react'
import Mandate from '../../../components/website/mandate/Mandate'
import Core from '../../../components/website/mandate/Core'

const page = () => {
  return (
    <div className='flex flex-col gap-16 mb-12'>
      <Mandate />
      <Core />
    </div>
  )
}

export default page