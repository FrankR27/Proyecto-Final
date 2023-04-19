/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route, useNavigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import { MovieContextProvider } from './context/MovieContext'
import HomeScreen from './pages/HomeScreen'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Movies from './pages/Movies'
import { Login } from './pages/Login'
import SingleMovie from './pages/SingleMovie'
import { Register } from './pages/Register'
import { useEffect } from 'react'

export const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/movies')
    } else {
      navigate('/')
    }
  }, [])

  return (
    <div className="App">
      <MovieContextProvider>
        <div className="h-header bg-main w-full">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </MovieContextProvider>
    </div>
  )
}
