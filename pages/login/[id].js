import Link from 'next/link';
import React, { useState, useEffect, memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineOfficeBuilding, 
  HiOutlineBriefcase,
  HiOutlineEye, 
  HiOutlinePencil,
  HiOutlineGlobe
} from 'react-icons/hi';
import { 
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTwitch
} from 'react-icons/fa';

// Layout components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

// Dynamically imported components
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), {
  ssr: false,
});
const RotatingLines = dynamic(() => import('react-loader-spinner').then(mod => mod.RotatingLines), {
  ssr: false,
});
const MultiStepForm = dynamic(() => import('@/components/Onboarding'), {
  loading: () => <Loader />,
  ssr: false,
});

const socialIcons = {
  facebook: <FaFacebook className="w-5 h-5 text-[#1877F2]" />,
  instagram: <FaInstagram className="w-5 h-5 text-[#E1306C]" />,
  twitter: <FaTwitter className="w-5 h-5 text-[#1DA1F2]" />,
  linkedin: <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />,
  youtube: <FaYoutube className="w-5 h-5 text-[#FF0000]" />,
  twitch: <FaTwitch className="w-5 h-5 text-[#6441A4]" />,
  other: <HiOutlineGlobe className="w-5 h-5 text-[#D4AF37]" />
};

function LoginProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useState({
    profile: null,
    profilePic: null,
    username: "",
    loading: true,
    initialLoadComplete: false  // New state to track initial load completion
  });

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
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        router.push('/login');
      }
    };
    
    verifyAuth();
  }, [router]);

  useEffect(() => {
    if (!id) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`);
        
        if (!res.ok) {
          setState(prev => ({ 
            ...prev, 
            profile: null, 
            loading: false,
            initialLoadComplete: true  // Mark loading as complete
          }));
          return;
        }

        const data = await res.json();
        const profilePicture = data.url;
        const profileData = data.data?.profile?.[0];

        if (!profileData) {
          setState(prev => ({ 
            ...prev, 
            profile: null, 
            loading: false,
            initialLoadComplete: true  // Mark loading as complete
          }));
          return;
        }

        setState(prev => ({
          ...prev,
          profile: profileData,
          profilePic: profilePicture,
          username: data.data.username,
          loading: false,
          initialLoadComplete: true  // Mark loading as complete
        }));
      } catch (error) {
        console.error(error);
        setState(prev => ({ 
          ...prev, 
          profile: null, 
          loading: false,
          initialLoadComplete: true  // Mark loading as complete even on error
        }));
      }
    };

    fetchProfile();
  }, [id]);

  const handleEditClick = useCallback(() => {
    router.push(`/login/${id}/edit`);
  }, [router, id]);

  // Always show loader during initial loading or until initial load is complete
  if (state.loading || !state.initialLoadComplete) {
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

  // Only show MultiStepForm once initial load is complete AND profile is null
  if (!state.profile && state.initialLoadComplete) {
    return <MultiStepForm />;
  }

  // Process social media links
  const socialMediaLinks = {};
  if (state.profile.socialMedia && state.profile.socialMedia.length > 0) {
    state.profile.socialMedia.forEach(item => {
      const platform = Object.keys(item)[0];
      if (platform !== '_id') {
        socialMediaLinks[platform] = item[platform];
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#071013]">
      <Head>
        <title>Dashboard | XclusiveTouch</title>
        <meta name="description" content="Manage your XclusiveTouch digital business card" />
      </Head>

      <Navbar />
      <Toaster />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#D4AF37]/20 to-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-1/4 flex justify-center md:justify-start">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#D4AF37]/50 bg-[#D4AF37]/10 flex items-center justify-center relative">
                  {state.profilePic ? (
                    <img 
                      src={state.profilePic}
                      alt={`${state.profile.firstName || 'User'}'s profile picture`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "/assets/default-avatar.png"; // Fallback to default image
                      }}
                    />
                  ) : (
                    <HiOutlineUser className="w-12 h-12 text-[#D4AF37]" />
                  )}
                </div>
              </div>
              
              <div className="md:w-3/4 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome, {state.profile.firstName || 'there'}!
                </h1>
                <p className="text-[#F6F8FF]/70 text-base md:text-lg mt-1 mb-3">
                  @{state.username}
                </p>
                
                {/* Social Media Icons */}
                {Object.keys(socialMediaLinks).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    {Object.entries(socialMediaLinks).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link.startsWith('http') ? link : `https://${link}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                      >
                        {socialIcons[platform.toLowerCase()] || socialIcons.other}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Action Buttons */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href={`/profile/${state.username}`} className="block">
            <button className="w-full py-4 px-6 bg-[#D4AF37] text-black rounded-xl font-medium transition-colors hover:bg-[#E5C158] flex items-center justify-center gap-3 shadow-lg">
              <HiOutlineEye className="w-6 h-6" />
              <span>View Public Profile</span>
            </button>
          </Link>
          
          <button 
            onClick={handleEditClick}
            className="w-full py-4 px-6 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium transition-colors hover:bg-white/20 flex items-center justify-center gap-3 shadow-lg"
          >
            <HiOutlinePencil className="w-6 h-6 text-[#D4AF37]" />
            <span>Edit Profile</span>
          </button>
        </section>
        
        {/* Profile Preview Section */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg h-full">
              <div className="relative h-48 sm:h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/30 to-blue-900/30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="inline-flex items-center bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Card Preview</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Your Digital Business Card</h2>
                <p className="text-[#F6F8FF]/70 mb-5">
                  Here&apos;s what people will see when they scan your XclusiveTouch card.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center py-3 border-b border-white/10">
                    <HiOutlineUser className="h-6 w-6 text-[#D4AF37] mr-4" />
                    <div>
                      <span className="text-white/60 text-sm">Name</span>
                      <p className="text-white font-medium">{state.profile.firstName && state.profile.lastName ? `${state.profile.firstName} ${state.profile.lastName}` : "Not set"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center py-3 border-b border-white/10">
                    <HiOutlineMail className="h-6 w-6 text-[#D4AF37] mr-4" />
                    <div>
                      <span className="text-white/60 text-sm">Email</span>
                      <p className="text-white font-medium">{state.profile.email || "Not set"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center py-3 border-b border-white/10">
                    <HiOutlinePhone className="h-6 w-6 text-[#D4AF37] mr-4" />
                    <div>
                      <span className="text-white/60 text-sm">Phone</span>
                      <p className="text-white font-medium">{state.profile.phoneNumber || "Not set"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center py-3 border-b border-white/10">
                    <HiOutlineOfficeBuilding className="h-6 w-6 text-[#D4AF37] mr-4" />
                    <div>
                      <span className="text-white/60 text-sm">Company</span>
                      <p className="text-white font-medium">{state.profile.company || "Not set"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center py-3 border-b border-white/10">
                    <HiOutlineBriefcase className="h-6 w-6 text-[#D4AF37] mr-4" />
                    <div>
                      <span className="text-white/60 text-sm">Position</span>
                      <p className="text-white font-medium">{state.profile.position || "Not set"}</p>
                    </div>
                  </div>
                  
                  {/* Social Media Links */}
                  {Object.keys(socialMediaLinks).length > 0 && (
                    <div className="flex items-start py-3">
                      <div className="flex-shrink-0 h-6 w-6 text-[#D4AF37] mr-4">
                        <HiOutlineGlobe className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <span className="text-white/60 text-sm">Social Links</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(socialMediaLinks).map(([platform, link]) => (
                            <a
                              key={platform}
                              href={link.startsWith('http') ? link : `https://${link}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
                              title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                            >
                              {socialIcons[platform.toLowerCase()] || socialIcons.other}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default memo(LoginProfile);