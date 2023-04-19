/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Layout from '../Layout/Layout'
import Filters from '../components/Home/Filters'
import { useEffect } from 'react'
import Movie from '../components/Movie'
import { useMovies } from '../context/MovieContext'

function Movies () {
  const { movies, getMovies, deleteMovie, updateMovie } = useMovies()

  const userId = localStorage.getItem('id')

  useEffect(() => {
    getMovies(userId)
  }, [userId])

  return (
    <div>
      <Layout>
        <div className='min-height-screen container mx-auto px-2 my-6'>
          <Filters />
          <p className='text-lg font-medium my-6'>
            Total <span className='font-bold text-subMain'>{movies.length}</span>{' '} items Found
          </p>
          <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
            {
            movies.length === 0
              ? <p className='text-xl font-medium'>You don't have movies added</p>
              : movies.map(movieP => (
                (
            <Movie
              key={movieP.id}
              movieP={movieP}
              deleteMovie={deleteMovie}
              updateMovie={updateMovie}
            />
                )
              ))
          }
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Movies
