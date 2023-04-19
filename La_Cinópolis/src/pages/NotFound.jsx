/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react'
import { Link } from 'react-router-dom'
import imagen from '../images/404.svg'
import { FaHome } from 'react-icons/fa'

function NotFound () {
  return (
    <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
      <img alt="not found" className='w-full h-96 object-contain ' src={imagen} />
      <h1 className='lg:text-4xl font-bold'>Page Not Found</h1>
      <p className='font-midium text-border italic leading-6'>
        The page you are looking for does no exist. You may have mistyped the URL
      </p>
      <Link to='/' className='bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main  px-6 rounded-md'>
        <FaHome /> Back Home
      </Link>
    </div>
  )
}

export default NotFound
