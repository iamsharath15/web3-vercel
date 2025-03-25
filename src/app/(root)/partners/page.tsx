import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <div
      className="flex h-screen items-center justify-center w-full"
      style={{
        background: `
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0.1, 0.2, 0.3, 0.99) 100%),
      linear-gradient(to right, 
        #6A5ACD 0%, 
        #C54B8C 50%, 
        #B284BE 100%)
    `,
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="flex flex-col items-center justify-center w-7/12 gap-4 ">
        <Image
          src="/assets/image/comingsoon.png"
          alt="logo"
          width={200}
          height={200}
        />
        <h1 className="text-2xl text-white text-center">Coming soon</h1>
        <p className="text-sm text-white text-center">
          "Something exciting is on the way! Stay tuned for the latest updates,
          and be the first to know when we launch. Big things are coming soon!"
        </p>
      </div>
    </div>
  );
};

export default page;
