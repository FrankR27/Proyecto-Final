import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import MovieInfo from '../components/Single/MovieInfo'
import { useParams } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'

function SingleMovie () {
  const [movie, setMovie] = useState()

  const { id } = useParams()
  const { getMovie } = useMovies()

  useEffect(() => {
    getMovie(id).then((movie) => setMovie(movie))
  }, [id])

  return (
    <Layout>
      <MovieInfo movie={movie} />
    </Layout>
  )
}

export default SingleMovie
