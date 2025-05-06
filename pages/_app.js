// pages/_app.js
import React from 'react';
import { useRouter } from 'next/router';
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropTypes from 'prop-types';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isProfilePage = router.pathname.startsWith('/profile');
  const isOnboarding = router.pathname.startsWith('/login/');

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        {!isProfilePage && !isOnboarding && <Navbar />}
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        {!isProfilePage && !isOnboarding && <Footer />}
      </div>
    </ErrorBoundary>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};