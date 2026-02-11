import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';
import { isValidEmail } from '@/lib/validation';
import { API_ENDPOINTS } from '@/lib/api';

export default function ResendConfirmation() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.resendConfirmation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (data.status === 'ok') {
        setIsSuccess(true);
        toast.success(data.message || 'Verification email sent successfully!');
      } else {
        toast.error(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Resend confirmation error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Resend Verification Email | XclusiveTouch</title>
      </Head>
      
      <Toaster />
      
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#D4AF37]">XclusiveTouch</h1>
          </div>

          {/* Card */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            {!isSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                    <svg className="h-8 w-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Resend Verification Email</h2>
                  <p className="text-gray-600">
                    Enter your email address to receive a new verification link
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="your@email.com"
                      className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] sm:text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center items-center rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#B8941F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Resend Verification Email'
                    )}
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/login"
                    className="text-sm font-semibold text-[#D4AF37] hover:text-[#B8941F] transition-colors"
                  >
                    Back to Login
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a new verification link to <strong>{email}</strong>. Please check your inbox and spam folder.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  The verification link will expire in 24 hours.
                </p>
                <div className="space-y-3">
                  <Link 
                    href="/login"
                    className="block w-full rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#B8941F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] transition-colors"
                  >
                    Go to Login
                  </Link>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail('');
                    }}
                    className="block w-full rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Send to Different Email
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Tip:</strong> Check your spam folder if you don't see the email. Add noreply@xclusivetouch.ca to your contacts to ensure delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
