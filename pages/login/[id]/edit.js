import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import EditProfile from '@/components/profile/EditProfile';
import Loader from '@/components/Loader';

// Dynamically imported components
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), {
  ssr: false,
});
const RotatingLines = dynamic(() => import('react-loader-spinner').then(mod => mod.RotatingLines), {
  ssr: false,
});

export default function EditProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth verification
  useEffect(() => {
    const token = localStorage.getItem('xclusiveToken');
    const userId = localStorage.getItem('userId');
    
    // If no token or userId, redirect to login
    if (!token || !userId) {
      router.push('/login');
      return;
    }
    
    // Verify token is valid for this user
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
        } else {
          // Token valid, fetch profile data
          fetchProfile();
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        router.push('/login');
      }
    };

    const fetchProfile = async () => {
      if (!id) return;
      
      try {
        const res = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`);
        
        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();
        const profileData = data.data?.profile?.[0];
        const profileUrl = data.url;

        if (!profileData) {
          setLoading(false);
          return;
        }

        setProfile(profileData);
        setProfileUrl(profileUrl);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (id) {
      verifyAuth();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#071013]">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#D4AF37"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (!profile) {
    router.push(`/login/${id}`);
    return <Loader />;
  }

  return (
    <>
      <Toaster />
      <EditProfile id={id} profile={profile} profileUrl={profileUrl} />
    </>
  );
}