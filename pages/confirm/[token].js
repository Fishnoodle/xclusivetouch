import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { API_ENDPOINTS } from '@/lib/api';

export default function ConfirmEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('verifying');
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    if (token) {
      // Call backend confirmation endpoint
      fetch(`${API_ENDPOINTS.confirm}/${token}`)
        .then(res => {
          if (res.ok) {
            setStatus('success');
            // Start countdown
            const timer = setInterval(() => {
              setCountdown(prev => {
                if (prev <= 1) {
                  clearInterval(timer);
                  router.push('/login');
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
            
            return () => clearInterval(timer);
          } else {
            setStatus('error');
          }
        })
        .catch(() => setStatus('error'));
    }
  }, [token, router]);
  
  return (
    <>
      <Head>
        <title>Email Verification | XclusiveTouch</title>
      </Head>
      
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#D4AF37]">XclusiveTouch</h1>
          </div>

          {/* Card */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            {status === 'verifying' && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <svg className="animate-spin h-8 w-8 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Email</h2>
                <p className="text-gray-600">Please wait while we confirm your email address...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">✅ Email Verified!</h2>
                <p className="text-gray-600 mb-4">
                  Your email has been successfully verified. You can now log in to your account.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Redirecting to login in {countdown} second{countdown !== 1 ? 's' : ''}...
                </p>
                <Link 
                  href="/login"
                  className="inline-flex justify-center rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#B8941F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] transition-colors"
                >
                  Go to Login Now
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">❌ Verification Failed</h2>
                <p className="text-gray-600 mb-6">
                  This verification link is invalid or has expired. Verification links expire after 24 hours.
                </p>
                <div className="space-y-3">
                  <Link 
                    href="/resend-confirmation"
                    className="block w-full rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#B8941F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] transition-colors"
                  >
                    Resend Verification Email
                  </Link>
                  <Link 
                    href="/login"
                    className="block w-full rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Need help?{' '}
            <Link href="/contact" className="font-semibold text-[#D4AF37] hover:text-[#B8941F]">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
