/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useState } from 'react'

export const MovieContext = createContext()

export const useMovies = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider')
  }

  return context
}

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])

  const getMovies = async (userId) => {
    const url = `https://localhost:7137/api/Movies/user/${userId}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await res.json()
    setMovies(data.result)
  }

  const getGenres = async (userId) => {
    const url = `https://localhost:7137/api/Genre/user/${userId}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await res.json()
    setGenres(data.result)
  }

  const getMovie = async (id) => {
    const url = `https://localhost:7137/api/Movies/${id}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await res.json()
    return data.result
  }

  const createMovie = async (movie) => {
    const url = 'https://localhost:7137/api/Movies'

    const formData = new FormData()
    formData.append('Title', movie.Title)
    formData.append('Description', movie.Description)
    formData.append('ReleaseDate', movie.ReleaseDate)
    formData.append('Genre', movie.Genre)
    formData.append('FilePath', movie.FilePath)
    formData.append('UserId', movie.UserId)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        ContentType: 'multipart/form-data'
      },
      body: formData
    })
    const data = await res.json()
    window.location.reload()
    return data
  }

  const updateMovie = async (movie) => {
    const url = `https://localhost:7137/api/Movies/${movie.id}`

    const formData = new FormData()
    formData.append('Id', movie.id)
    formData.append('Title', movie.title)
    formData.append('Description', movie.description)
    formData.append('ReleaseDate', movie.releaseDate)
    formData.append('Genre', movie.genre)
    if (movie.filePath !== null) {
      formData.append('FilePath', movie.filePath)
    }
    formData.append('UserId', movie.userId)
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
    const data = await res.json()
    console.log(data)
    window.location.reload()
  }

  const deleteMovie = async (id) => {
    const url = `https://localhost:7137/api/Movies?id=${id}`
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await res.json()
    window.location.reload()
    return data
  }

  return (
        <MovieContext.Provider value={{ movies, setMovies, createMovie, getMovies, deleteMovie, getMovie, updateMovie, genres, getGenres }}>
        {children}
        </MovieContext.Provider>
  )
}
