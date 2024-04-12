import { useRouter } from 'next/router';
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isProfilePage = router.pathname.startsWith('/profile');

  return (
    <div className="flex flex-col min-h-screen">
      {!isProfilePage && <Navbar />}
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      {!isProfilePage && <Footer />}
    </div>
  );
}