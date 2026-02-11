import { React, useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { API_ENDPOINTS } from '@/lib/api';
import { isValidEmail, validatePassword } from '@/lib/validation';

export default function LoginSection() {
  const router = useRouter();
  
  // UseStates
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [buttonText, setButtonText] = useState('Sign in');
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  
  // Register states
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerButtonText, setRegisterButtonText] = useState('Create Account');

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('xclusiveToken');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        try {
          const response = await fetch(API_ENDPOINTS.verifyToken, {
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
    event.preventDefault();
    
    // Reset verification error state
    setNeedsEmailVerification(false);
    
    // Validate email
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setButtonText('Signing In...');

    try {
      const response = await fetch(API_ENDPOINTS.login, {
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
        // Store token, userId, and email from backend response
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('xclusiveToken', data.token); // Keep for backwards compatibility
        }
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('email', data.email); // Store email from backend
        
        toast.success('Login successful!');
        
        // Check if profile exists
        try {
          const profileResponse = await fetch(API_ENDPOINTS.profile(data.userId), {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${data.token}`,
              'Content-Type': 'application/json',
            },
          });
          
          const profileData = await profileResponse.json();
          
          // Check if profile exists (status: 'ok' with data) or needs to be created (status: 'error')
          if (profileData.status === 'ok' && profileData.data) {
            // Profile exists, redirect to dashboard
            console.log('Profile found, redirecting to dashboard');
            router.push(`/login/${data.userId}`);
          } else if (profileData.status === 'error') {
            // Profile doesn't exist or server error - redirect to onboarding
            // Handles: "Profile not found", "Failed to retrieve profile", and any other errors
            console.log(`Profile error: ${profileData.error}, redirecting to onboarding`);
            router.push(`/login/${data.userId}/onboarding`);
          } else {
            // Unknown response format, default to onboarding
            console.log('Unknown profile response, redirecting to onboarding');
            router.push(`/login/${data.userId}/onboarding`);
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          // Network or parse error, default to onboarding to be safe
          router.push(`/login/${data.userId}/onboarding`);
        }
      } else {
        // Check if error is due to unverified email
        if (data.error && data.error.toLowerCase().includes('verify your email')) {
          setNeedsEmailVerification(true);
          setUnverifiedEmail(email);
          toast.error(data.error, { duration: 5000 });
        } else {
          console.log('ERROR');
          toast.error('Login failed: ' + (data.error || 'Invalid credentials'));
        }
        setButtonText('Sign in');
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message);
      setButtonText('Sign in');
    }
  }
  
  // Resend verification email
  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;
    
    try {
      const response = await fetch(API_ENDPOINTS.resendConfirmation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: unverifiedEmail })
      });
      
      const data = await response.json();
      
      if (data.status === 'ok') {
        toast.success('Verification email sent! Please check your inbox.');
      } else {
        toast.error(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      toast.error('Failed to send verification email');
      console.error('Resend error:', error);
    }
  };
  
  // Register function
  async function register(event) {
    event.preventDefault();
    
    // Validate email
    if (!isValidEmail(registerEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Validate password
    const passwordValidation = validatePassword(registerPassword);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setRegisterButtonText('Creating Account...');

    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        toast.success('Registration successful! Check your email to verify.', { duration: 4000 });
        // Redirect to check email page
        setTimeout(() => {
          router.push(`/check-your-email?email=${encodeURIComponent(registerEmail)}`);
        }, 1500);
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

                {/* Email Verification Reminder */}
                {needsEmailVerification && (
                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-yellow-800">📧 Email Verification Required</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Please check your inbox and click the verification link to activate your account.</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={handleResendVerification}
                            className="bg-yellow-50 px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600 transition-colors"
                          >
                            Resend Email
                          </button>
                          <Link
                            href="/resend-confirmation"
                            className="bg-yellow-50 px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600 transition-colors"
                          >
                            Verification Page
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                <form className="space-y-6" action="#" method="POST">
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