import React from "react";

const Teacher = () => {
  return (
    <div className="container mx-auto py-20">
      <p className="text-base lg:text-xl font-medium text-gray-500 uppercase">
       Key Person
      </p>
      <p className="text-3xl lg:text-5xl font-semibold text-gray-500  mt-3">
      Meet our teachers
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 py-10 lg:py-20">
        <div className="flex flex-col gap-5 ">
          <img src="/assets/t1.svg" alt="v1" />
          <p className="text-2xl font-semibold">1. Tap or Scan Card</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
              XlclusiveTouch works on all devices via NFC.
            </p>
          </div>
       
        </div>
        <div className="flex flex-col gap-5 ">
          <img src="/assets/t2.svg" alt="v1" />
          <p className="text-2xl font-semibold">2. Create Engagement</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
              Profiles can be customize to your needs, creating engaging and an interactive experience for your users
            </p>
          </div>
       
        </div>
        <div className="flex flex-col gap-5 ">
          <img src="/assets/t3.svg" alt="v1" />
          <p className="text-2xl font-semibold">3. Start Networking</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
              Make it easier to connect with people by saving your contact details, as well as sharing information seamlessly
            </p>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Teacher;
