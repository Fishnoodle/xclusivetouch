// pages/_app.js
import "@/styles/globals.css";
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { Suspense } from 'react';

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Dynamic imports with explicit SSR setting
const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false,
  loading: () => <div className="h-16">Loading Navbar...</div>, // Add appropriate height
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  loading: () => <div className="h-12">Loading Footer...</div>, // Add appropriate height
});

// Error boundary component
function ErrorBoundary({ children }) {
  return (
    <div className="error-boundary">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isProfilePage = router.pathname?.startsWith('/profile') || false;
  const isOnboarding = router.pathname?.startsWith('/login/') || false;

  return (
    <ErrorBoundary>
      <div className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        {(!isProfilePage && !isOnboarding) && (
          <Suspense fallback={<div className="h-16">Loading...</div>}>
            <Navbar />
          </Suspense>
        )}
        
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Component {...pageProps} />
          </Suspense>
        </main>

        {(!isProfilePage && !isOnboarding) && (
          <Suspense fallback={<div className="h-12">Loading...</div>}>
            <Footer />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}