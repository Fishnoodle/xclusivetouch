import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { API_ENDPOINTS } from '@/lib/api';

export default function CheckYourEmail() {
  const router = useRouter();
  const { email } = router.query;
  const [isResending, setIsResending] = useState(false);
  
  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email address not found');
      return;
    }
    
    setIsResending(true);
    
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
        toast.success('Verification email sent! Please check your inbox.');
      } else {
        toast.error(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      toast.error('Failed to send verification email');
      console.error('Resend error:', error);
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Check Your Email | XclusiveTouch</title>
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
            <div className="text-center">
              {/* Email Icon */}
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-6">
                <svg className="h-10 w-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                ✉️ Check Your Email
              </h2>
              
              <p className="text-gray-600 mb-2">
                We've sent a confirmation email to:
              </p>
              
              {email && (
                <p className="text-lg font-semibold text-[#D4AF37] mb-6">
                  {email}
                </p>
              )}
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-700 mb-3">
                  Please click the link in the email to verify your account.
                </p>
                
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Didn't receive it?
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Check your spam folder</li>
                  <li>Wait a few minutes for delivery</li>
                  <li>Make sure you entered the correct email</li>
                </ul>
              </div>
              
              {/* Resend Button */}
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full mb-3 inline-flex justify-center items-center rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#B8941F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResending ? (
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
              
              <Link
                href="/login"
                className="block w-full rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Important:</strong> The verification link expires in 24 hours. If it expires, you can request a new one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
