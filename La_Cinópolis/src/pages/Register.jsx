/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/UsedInputs'
import Layout from '../Layout/Layout'
import { FiLogIn } from 'react-icons/fi'
import imagen from '../images/palomitas-de-maiz.png'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('https://localhost:7137/api/Auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    }
    )

    if (response.ok) {
      const data = await response.json()
      const token = data.result.token
      localStorage.setItem('token', token)
      setMessage('User created successfully')
    } else {
      setError('Invalid username or password')
    }

    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
        <Layout>
        <div className='container mx-auto px-2 my-24 flex-colo'>
          <form onSubmit={handleSubmit} className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border'>
            <img src={imagen} alt="Logo" className='w-full h-12 object-contain' />
            <Input label='Username' placeholder='Frank' type='text' bg={true} value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input label='Email' placeholder='frank@gmail.com' type='email' bg={true} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label='Password' placeholder='********' type='password' bg={true} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
              <FiLogIn /> Sign Up
            </button>
            <p className='text-center text-border'>Already have an account?{' '}
              <Link to='/login' className='text-dryGray font-semibold ml-2'>Sign In</Link>
            </p>
          </form>
          {error && <p className='text-center text-red-500 py-3'>{error}</p>}
          {message && <p className='text-center text-green-500 py-3'>{message}</p>}
        </div>
        </Layout>
  )
}
