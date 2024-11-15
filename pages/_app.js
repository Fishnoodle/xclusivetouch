// pages/_app.js

import "@/styles/globals.css";
import dynamic from 'next/dynamic';
//import { ThemeProvider } from "@material-tailwind/react";
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

// Dynamically import Navbar and Footer
const Navbar = dynamic(() => import('@/components/Navbar'), {
  loading: () => <p>Loading Navbar...</p>,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <p>Loading Footer...</p>,
});

// Initialize the Inter font with desired configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isProfilePage = router.pathname.startsWith('/profile');
  const isOnboarding = router.pathname.startsWith('/login/');

  return (
    <div className={`${inter.variable} flex flex-col min-h-screen`}>
      {(!isProfilePage && !isOnboarding) && <Navbar />}
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      {(!isProfilePage && !isOnboarding) && <Footer />}
    </div>
  );
}