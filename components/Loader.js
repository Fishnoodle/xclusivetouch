// components/Loader.js
import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader-container">
      <Circles
        height={80}
        width={80}
        color="#D4AF37"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        // Optional: Add additional props as needed
      />
    </div>
  );
};

export default Loader;