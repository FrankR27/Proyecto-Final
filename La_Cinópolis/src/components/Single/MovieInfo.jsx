/* eslint-disable react/prop-types */
import React from 'react'

function MovieInfo ({ movie }) {
  const nombreImagen = movie?.filePath?.split('\\')[1].split('.')[0]
  return (
        <div className='w-full xl:h-screen relative text-white'>
            <img src={`https://localhost:7137/api/Movies/Images?nombreImagen=${nombreImagen}.jpg`} alt={movie?.title} className='w-full hidden xl:inline-block h-full object-cover' />
            <div className='xl:bg-main bg-dry flex flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
                <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
                    <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
                        <img src={`https://localhost:7137/api/Movies/Images?nombreImagen=${nombreImagen}.jpg`} alt={movie?.title} className='w-full h-full object-cover' />
                    </div>
                    <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                        <div className='col-span-3 flex flex-col gap-10'>
                            <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>{movie?.title}</h1>
                            <div className='flex items-center gap-4 font-medium text-dryGray'>
                                <div className='flex-colo bg-subMain text-xs px-2 py-1'>
                                    HD 4K
                                </div>
                                <div className='flex-colo bg-subMain text-xs px-2 py-1'>
                                    {movie?.genre}
                                </div>
                                <div className='flex-colo bg-subMain text-xs px-2 py-1'>
                                  {movie?.releaseDate}
                            </div>
                        </div>
                        <p className='text-text text-sm leading-7'>{movie?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    </div >
  )
}

export default MovieInfo
