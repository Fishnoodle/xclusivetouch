import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

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
    <ThemeProvider>
      <div className={`${inter.variable} flex flex-col min-h-screen`}>
        {(!isProfilePage && !isOnboarding) && <Navbar />}
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        {(!isProfilePage && !isOnboarding) && <Footer />}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </ThemeProvider>
  );
}