import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Loader from '@/components/Loader';

// Dynamically imported components
const OnboardingForm = dynamic(() => import('@/components/Onboarding'), {
  loading: () => <Loader />,
  ssr: false,
});

const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), {
  ssr: false,
});

export default function OnboardingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    // Check if user is authenticated
    const token = localStorage.getItem('xclusiveToken');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId || userId !== id) {
      router.push('/login');
      return;
    }
    
    // Verify token is valid and get user data
    const verifyAuth = async () => {
      try {
        const response = await fetch('https://api.xclusivetouch.ca/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (data.status !== 'ok') {
          // Token invalid, redirect to login
          localStorage.removeItem('xclusiveToken');
          localStorage.removeItem('userId');
          router.push('/login');
          return;
        }
        
        // Check if user already has a profile
        const profileCheck = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`);
        
        if (profileCheck.ok) {
          const profileData = await profileCheck.json();
          
          if (profileData.data?.profile?.[0]) {
            // User already has a profile, redirect to dashboard
            router.push(`/login/${id}`);
            return;
          }
        }
        
        // Fetch user data to prefill the form
        const userDataResponse = await fetch(`https://api.xclusivetouch.ca/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUserData(userData.data);
        }
        
        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth verification error:', error);
        router.push('/login');
      }
    };
    
    verifyAuth();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#071013]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4AF37] mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#071013]">
      <Head>
        <title>Create Your Profile | XclusiveTouch</title>
        <meta name="description" content="Set up your XclusiveTouch digital business card" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      
      <Toaster position="top-center" />
      
      {/* Fixed Logo Header */}
      <header className="py-6 px-4 flex justify-center">
        <Image 
          src="/assets/logo.png" 
          alt="XclusiveTouch" 
          width={180} 
          height={40}
          className="h-10 w-auto"
          priority
        />
      </header>
      
      {/* Main Content - Centered with Flex */}
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-5xl mx-auto">
          {isAuthorized && (
            <OnboardingForm 
              userId={id} 
              prefillData={userData} 
            />
          )}
        </div>
      </main>
      
      {/* Footer with Copyright */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} XclusiveTouch. All rights reserved.</p>
      </footer>
    </div>
  );
}