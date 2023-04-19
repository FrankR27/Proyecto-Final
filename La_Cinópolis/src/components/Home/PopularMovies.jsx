import React from 'react'
import Titles from '../Titles'
import { BsCollectionFill } from 'react-icons/bs'
import useFetchMovies from '../../hooks/useFetchMovies'
import Movie from '../Movie'

function PopularMovies () {
  const { movies } = useFetchMovies('https://api.themoviedb.org/3/movie/popular?api_key=10ff9cb11e32e0fa831038949084b41e&language=en-US&page=1')

  return (
        <div className='my-16'>
            <Titles title={'Popular Movies'} Icon={BsCollectionFill} />
            <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {movies.map((movieP, index) => (
                    <Movie key={index} movieP={movieP} />
                ))}
            </div>
        </div>
  )
}

export default PopularMovies
