import { useRouter } from 'next/router';
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isProfilePage = router.pathname.startsWith('/profile');
  const isOnboarding = router.pathname.startsWith('/login/');

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
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