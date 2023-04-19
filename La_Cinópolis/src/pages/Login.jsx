/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/UsedInputs'
import Layout from '../Layout/Layout'
import { FiLogIn } from 'react-icons/fi'
import imagen from '../images/palomitas-de-maiz.png'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('https://localhost:7137/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data?.result.token)
      localStorage.setItem('id', data?.result.id)
      if (localStorage.getItem('token') === null) {
        setLoggedIn(false)
        setError('Invalid username or password')
      } else {
        setLoggedIn(true)
      }
    }

    setUsername('')
    setPassword('')
  }

  if (loggedIn) {
    window.location.href = '/movies'
  }

  return (
    <Layout>
      <div className='container mx-auto px-2 my-24 flex-colo'>
      <img src="https://localhost:7137/api/Movies/Images?nombreImagen=3c5fc78b-c724-413d-b6bd-1582d1f4f770.jpg" alt="" />
        <form onSubmit={handleSubmit} className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border'>
          <img src={imagen} alt="Logo" className='w-full h-12 object-contain' />
          <Input label='Username' placeholder='Frank' type='text' bg={true} value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label='Password' placeholder='********' type='password' bg={true} value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
            <FiLogIn /> Sign In
          </button>
          <p className='text-center text-border'>Don't have an account?{' '}
            <Link to='/register' className='text-dryGray font-semibold ml-2'>Sign Up</Link>
          </p>
        </form>
        {error && <p className='text-center text-red-500 py-3'>{error}</p>}
      </div>
    </Layout>
  )
}
