/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { v4 as uuidv4 } from 'uuid'
import { useMovies } from '../../context/MovieContext'

function Filters () {
  const [genre, setGenre] = useState('')
  const [stateGenre, setStateGenre] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [movie, setMovie] = useState({
    Title: '',
    Description: '',
    ReleaseDate: '',
    Genre: '',
    FilePath: null,
    UserId: Number(localStorage.getItem('id'))
  })

  const { createMovie, genres, getGenres } = useMovies()

  useEffect(() => {
    getGenres(localStorage.getItem('id'))
  }, [])

  const createGenre = async (e) => {
    e.preventDefault()
    const url = 'https://localhost:7137/api/Genre'

    const formData = new FormData()
    formData.append('Name', genre.Title)
    formData.append('UserId', localStorage.getItem('id'))

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        ContentType: 'multipart/form-data'
      },
      body: formData
    })
    const data = await res.json()
    setStateGenre(data.result)
    setShowModal2(false)
    window.location.reload()
  }

  const handleCreateMovie = async (e) => {
    e.preventDefault()
    await createMovie(movie)
    setMovie({
      Title: '',
      Description: '',
      ReleaseDate: '',
      Genre: '',
      FilePath: null,
      UserId: Number(localStorage.getItem('id'))
    })
    setShowModal(false)
  }

  return (
    <div className='my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6'>

      <button onClick={() => setShowModal2(true)} className='text-white bg-subMain focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center'>Add Genre</button>
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className='py-6 px-6 lg:px-8 text-left'>
          <h3 className='flex justify-center mb-4 text-xl font-medium text-gray-900'>Register Genre</h3>
          <form onSubmit={createGenre} className='space-y-6'>
            <div>
              <label htmlFor='Title' className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
              <input onChange={(e) => { setGenre({ ...genre, Title: e.target.value }) }} type='text' name='Title' id='Title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' placeholder='Action' required />
            </div>
            <button type='submit' className='text-white bg-subMain focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center'>Add Genre</button>
          </form>
          {stateGenre && <div className='text-center text-white bg-subMain font-medium text-sm rounded-lg px-5 py-2.5'>{stateGenre}</div>}
        </div>
      </Modal>

      {/* Si no hay generos desabilita el boton de crear peliculas */}
      {genres.length === 0 ? <button disabled className='text-white bg-subMain focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center'>Add Movie</button> : <button onClick={() => setShowModal(true)} className='text-white bg-subMain focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center'>Add Movie</button>}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className='py-6 px-6 lg:px-8 text-left'>
          <h3 className='flex justify-center mb-4 text-xl font-medium text-gray-900'>Register Movie</h3>
          <form onSubmit={handleCreateMovie} className='space-y-6'>
            <div>
              <label htmlFor='Title' className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
              <input value={movie.Title} onChange={(e) => { setMovie({ ...movie, Title: e.target.value }) }
              } type='text' name='Title' id='Title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' placeholder='John Wick 4' required />
            </div>

            <div>
              <label htmlFor='Description' className='block mb-2 text-sm font-medium text-gray-900'>Description</label>
              <input value={movie.Description} onChange={(e) => setMovie({ ...movie, Description: e.target.value })} type='text' name='Description' id='Description' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' required />
            </div>

            <div>
              <label htmlFor='ReleaseDate' className='block mb-2 text-sm font-medium text-gray-900'>Release Date</label>
              <input value={movie.ReleaseDate} onChange={(e) => setMovie({ ...movie, ReleaseDate: e.target.value })} type='date' name='ReleaseDate' id='ReleaseDate' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' placeholder='11/11/2000' required />
            </div>

            <div>
              <label htmlFor="Genre" className='block mb-2 text-sm font-medium text-gray-900'>Genre</label>
              <select value={movie.Genre} onChange={(e) => setMovie({ ...movie, Genre: e.target.value })} name="Genre" id="Genre" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' required>
                <option>Select Genre</option>
              {
                genres.map((genre) => (
                  <option key={uuidv4()} value={genre.name}>{genre.name}</option>
                ))
              }
              </select>
            </div>

            <div>
              <label htmlFor='FilePath' className='block mb-2 text-sm font-medium text-gray-900'>File</label>
              <input onChange={(e) => setMovie({ ...movie, FilePath: e.target.files[0] })} type='file' accept="image/jpeg" name='FilePath' id='FilePath' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' required />
            </div>
            <button type='submit' className='text-white bg-subMain focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center'>Add Movie</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Filters
