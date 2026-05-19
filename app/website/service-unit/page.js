import React from 'react'
import Unit from '../../../components/website/service-unit/Unit'
import Discover from '../../../components/website/service-unit/Discover'
import Join from '../../../components/website/service-unit/Join'

const page = () => {
  return (
    <div className="my-20 flex flex-col gap-16">
      <Unit />
      <Discover />
      <Join />
    </div>
  )
}

export default page