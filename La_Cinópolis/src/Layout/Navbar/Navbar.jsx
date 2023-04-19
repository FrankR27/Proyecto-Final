/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaSearch, FaHeart } from 'react-icons/fa'
import imagen from '../../images/palomitas-de-maiz.png'
import { useMovies } from '../../context/MovieContext'

function Navbar () {
  const hover = 'hover:text-subMain transitions text-white'
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover)
  const [search, setSearch] = useState('')
  // const { movies } = useMovies()

  // Si el path es diferente a '/movies' desabilita el input
  const [disabled, setDisabled] = useState(false)

  // Verificar si el usuario esta logueado o no
  const [isLogged, setIsLogged] = useState(false)

  function handleLogout () {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setIsLogged(false)
    window.location.href = '/'
  }

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      setIsLogged(false)
    } else {
      setIsLogged(true)
    }
  }, [])

  return (
    <>
      <div className="bg-main shadow-sm sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img src={imagen} alt="logo" className="w-full h-12 object-contain" />
            </Link>
          </div>
          {/* Search Form */}
          <div className="col-span-3">
            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search Movies"
                disabled={disabled}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          {/* Menu */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            {isLogged && (
              <NavLink to="/movies" className={Hover}>
                Movies
              </NavLink>
            )}
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink to="/favorite" className={`${Hover} relative`}>
              <FaHeart className="w-6 h-6" />
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                3
              </div>
            </NavLink>
            {isLogged
              ? (
                <button onClick={handleLogout} className="bg-subMain p-2 rounded-lg">
                  Logout
                </button>
                )
              : (
                <NavLink to="/login" className="bg-subMain p-2 rounded-lg">
                  Login
                </NavLink>
                )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
