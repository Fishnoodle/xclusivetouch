import {React, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link'
import {toast, Toaster} from 'react-hot-toast'


export default function RegisterSection() {
  // UseStates
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [buttonText, setButtonText] = useState('Sign Up')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function register(event) {
    event.preventDefault()
    setButtonText('Signing Up')

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    const response = await fetch('https://api.xclusivetouch.ca/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: fullName.replace(/\s+/g, '').toLowerCase(), // Sent without spaces
        email: email,
        password: password
      })
    })

    const data = await response.json()

    if (!data.error) {
      toast.success('Registration successful. Please check your email for a confirmation link.')
      window.location.href = `/login`
    } else {
      console.log('ERROR')
      toast.error('Registration Failed' + data.error)
      setButtonText('Sign Up')
    }
  }
  
  return (
    <>
      <Toaster/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input 
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
              <div className="relative">
              <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>

              </div>
              <div className="mt-2">
              <div className="relative">
              <input
                  id="confirmPassword"
                  name="password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="confirm-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
              >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#D4AF37] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={register}
                onTouchStart={(event) => {
                  event.preventDefault()
                  register(event)
                }}
              >
                {buttonText}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link href='/login' className="font-semibold leading-6 text-[#D4AF37]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}