import {React, useState } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import {toast, Toaster} from 'react-hot-toast';


export default function LoginSection() {
  // UseStates
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  // MERN Stack - Login API
  async function login(event) {
    event.preventDefault()

    console.log(email, password)

    const notify = toast.loading('Logging in...')

    const response = await fetch('https://api.xclusivetouch.ca/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const data = await response.json()
    console.log(data.error)

    if (!data.error) {
      toast.success('Login successful!', { id: notify })
      window.location.href = `/profile/${data.user._id}`
    } else {
      console.log('ERRO')
      toast.error('Login failed: ' + data.error, { id: notify })
    }
  }



  return (
    <>
      <Toaster />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-[#D4AF37]">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
              <div className="relative">
              <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
              >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              </div>
              </div>
              
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#D4AF37] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={login}
                onTouchStart={(event) => {
                  event.preventDefault()
                  login(event)
                }}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link href='/register' className="font-semibold leading-6 text-[#D4AF37]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}