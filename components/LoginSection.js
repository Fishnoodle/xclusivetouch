import { React, useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function LoginSection() {
  const router = useRouter();
  
  // UseStates
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [buttonText, setButtonText] = useState('Sign in');
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Register states
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerButtonText, setRegisterButtonText] = useState('Create Account');
  const [name, setName] = useState('');

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('xclusiveToken');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        try {
          // You need to create this endpoint in your backend
          const response = await fetch('https://api.xclusivetouch.ca/api/verify-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          
          const data = await response.json();
          
          if (data.status === 'ok') {
            // Token is valid, redirect to dashboard
            router.push(`/login/${userId}`);
            return;
          } else {
            // Token is invalid or expired, clear storage
            localStorage.removeItem('xclusiveToken');
            localStorage.removeItem('userId');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [router]);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  // MERN Stack - Login API
  async function login(event) {
    event.preventDefault()

    console.log(email, password)

    alert('Currently, the login feature is not available. Please try again later.') 

    try {
      const response = await fetch('https://api.xclusivetouch.ca/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        // Store token and user ID in localStorage
        if (data.token) {
          localStorage.setItem('xclusiveToken', data.token);
        }
        localStorage.setItem('userId', data.user);
        
        toast.success('Login successful!');
        router.push(`/login/${data.user}`);
      } else {
        console.log('ERROR');
        toast.error('Login failed: ' + (data.error || 'Invalid credentials'));
        setButtonText('Sign in');
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message);
      setButtonText('Sign in');
    }
  }
  
  // Register function
  async function register(event) {
    event.preventDefault();
    
    if (registerPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setRegisterButtonText('Creating Account...');

    try {
      const response = await fetch('https://api.xclusivetouch.ca/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.replace(/\s+/g, '').toLowerCase(), // Sent without spaces
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        toast.success('Registration successful! Please sign in.');
        setIsLoginView(true); // Switch back to login view
        setEmail(registerEmail); // Pre-fill email for convenience
      } else {
        toast.error('Registration failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
    } finally {
      setRegisterButtonText('Create Account');
    }
  }

  // If still checking authentication, show loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="overflow-hidden">
        <div className={`flex transition-transform duration-500 ease-in-out ${isLoginView ? 'translate-x-0' : '-translate-x-1/2'}`} style={{ width: '200%' }}>
          {/* Login Section */}
          <div className="w-1/2 px-6 py-8">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Sign in to access your XclusiveTouch account
                </p>
              </div>

              <div className="mt-8">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                        Password
                      </label>
                      <div className="text-sm">
                        <Link href="/resetpassword" className="font-medium text-[#D4AF37] hover:text-[#C4A032]">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] sm:text-sm"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#C4A032] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200"
                      onClick={login}
                      onTouchStart={(event) => {
                        event.preventDefault();
                        login(event);
                      }}
                    >
                      {buttonText}
                    </button>
                  </div>
                </form>

                <div className="mt-10">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">Don&apos;t have an account?</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={toggleView}
                      className="flex w-full items-center justify-center rounded-md border border-[#D4AF37] bg-white px-4 py-2.5 text-sm font-semibold text-[#D4AF37] shadow-sm hover:bg-[#D4AF37]/5 transition-colors duration-200"
                    >
                      Create New Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Register Section */}
          <div className="w-1/2 px-6 py-8">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Your Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Join XclusiveTouch and elevate your networking
                </p>
              </div>

              <div className="mt-8">
                <form className="space-y-5" action="#" method="POST">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] sm:text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="register-email"
                        name="register-email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] sm:text-sm"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <div className="mt-1">
                      <div className="relative">
                        <input
                          id="register-password"
                          name="register-password"
                          type={showRegisterPassword ? 'text' : 'password'}
                          required
                          className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] sm:text-sm"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          edge="end"
                          style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
                        >
                          {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <div className="relative">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] sm:text-sm"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#C4A032] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200"
                      onClick={register}
                    >
                      {registerButtonText}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={toggleView}
                    className="text-sm font-medium text-[#D4AF37] hover:text-[#C4A032]"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}