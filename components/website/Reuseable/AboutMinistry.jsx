import React from 'react'

const AboutMinistry = ({ image, text }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
    >
      <div>
        <h2>
          {text}
        </h2>
      </div>
    </div>
  )
}

export default AboutMinistry