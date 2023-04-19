/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
import React from 'react'
import image from '../../images/head.png'

function Head ({title}) {
  return (
    <div className='w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md'>
        <img src={image} alt="aboutus" className='w-full h-full object-cover' />
        <div className='absolute lg:top-24 top-16 w-full flex-colo'>
          <h1 className='text-2xl lg:text-h1 text-white text-center  font-bold'>{title && title}</h1>
        </div>
    </div>
  )
}

export default Head
