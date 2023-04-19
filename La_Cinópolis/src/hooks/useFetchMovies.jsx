import { useEffect, useState } from 'react'

const useFetchMovies = (url) => {
  const [movies, Setmovies] = useState([])
  const [loading, setLoading] = useState(true)

  const getMovies = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      Setmovies(data.results)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [url])

  return { movies, loading }
}

export default useFetchMovies
