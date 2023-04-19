/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiFillBook, AiFillDelete } from 'react-icons/ai'
import Modal from './Modal'
import { v4 as uuidv4 } from 'uuid'
import { useMovies } from '../context/MovieContext'

// eslint-disable-next-line react/prop-types
function Movie ({ movieP, deleteMovie, updateMovie }) {
  const [showModal, setShowModal] = useState(false)
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: '',
    filePath: null,
    userId: Number(localStorage.getItem('id'))
  })

  const { getMovie, genres, getGenres } = useMovies()

  const nombreImagen = movieP?.filePath?.split('\\')[1].split('.')[0]
  const pathHome = window.location.pathname === '/'

  const handleUpdateMovie = (e) => {
    e.preventDefault()
    updateMovie(movie)
    setShowModal(false)
  }

  useEffect(() => {
    getGenres(localStorage.getItem('id'))
  }, [])

  async function handleClick () {
    setShowModal(true)
    const movieUpdate = await getMovie(movieP.id)

    setMovie({
      id: movieUpdate.id,
      title: movieUpdate.title,
      description: movieUpdate.description,
      releaseDate: new Date(movieUpdate.releaseDate).toISOString().split('T')[0],
      genre: movieUpdate.genre,
      filePath: movie.filePath,
      userId: Number(localStorage.getItem('id'))
    })
  }

  return (
        <>
            <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
                <Link to={!pathHome && `/movie/${movieP?.id}`}>
                    <img src={movieP?.filePath
                      ? `https://localhost:7137/api/Movies/Images?nombreImagen=${nombreImagen}.jpg`
                      : `http://image.tmdb.org/t/p/w500/${movieP?.poster_path
                        }`} alt={movieP?.title} className="w-full h-64 object-cover" />
                </Link>
                <div
                    className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3"
                >
                    <h3 className="font-semibold truncate">{movieP?.title}</h3>
                    {!pathHome && (
                        <div className='flex gap-2'>
                            <button className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-subMain rounded-md bg-subMain text-white">
                                <AiFillDelete onClick={() => deleteMovie(movieP.id)} />
                            </button>
                            <button className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-subMain rounded-md bg-subMain text-white">
                                <AiFillBook onClick={handleClick} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {!pathHome && (
                <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                                    <div className='py-6 px-6 lg:px-8 text-left'>
                                        <h3 className='flex justify-center mb-4 text-xl font-medium text-gray-900'>Update Movie</h3>
                                        <form onSubmit={handleUpdateMovie} className='space-y-6'>
                                            <div>
                                                <label htmlFor='Title' className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                                                <input value={movie?.title} onChange={(e) => { setMovie({ ...movie, title: e.target.value }) }
                                                } type='text' name='Title' id='Title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' placeholder='John Wick 4' required />
                                            </div>

                                            <div>
                                                <label htmlFor='Description' className='block mb-2 text-sm font-medium text-gray-900'>Description</label>
                                                <input value={movie?.description} onChange={(e) => setMovie({ ...movie, description: e.target.value })} type='text' name='Description' id='Description' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' required />
                                            </div>

                                            <div>
                                                <label htmlFor='ReleaseDate' className='block mb-2 text-sm font-medium text-gray-900'>Release Date</label>
                                                <input value={movie?.releaseDate} onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })} type='date' name='ReleaseDate' id='ReleaseDate' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' placeholder='11/11/2000' required />
                                            </div>

                                            <div>
                                                <label htmlFor="Genre" className='block mb-2 text-sm font-medium text-gray-900'>Genre</label>
                                                <select value={movie?.genre} onChange={(e) => setMovie({ ...movie, genre: e.target.value })} name="Genre" id="Genre" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' required>
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
                                                <input onChange={(e) => setMovie({ ...movie, filePath: e.target.files[0] })} type='file' accept="image/jpeg" name='FilePath' id='FilePath' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-subMain focus:border-subMain block  w-full p-2.5' />
                                            </div>
                                            <button type='submit' className='text-white bg-subMain focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center'>Update Movie</button>
                                        </form>
                                    </div>
                                </Modal>
            )}
        </>
  )
}

export default Movie
