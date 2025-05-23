import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#071013]">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#D4AF37] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}