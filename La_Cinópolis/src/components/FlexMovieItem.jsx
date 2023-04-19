/* eslint-disable react/prop-types */
import React from 'react'

function FlexMovieItem ({ movie }) {
  return (
    <>
        <div className='flex items-center gap-2'>
        {/* Solo muestra 20 palabras en la descripcion */}
            <span className='text-lg font-medium'>
                {movie.overview.split(' ').slice(0, 10).join(' ')}...
            </span>
        </div>
    </>
  )
}

export default FlexMovieItem
