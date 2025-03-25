'use client';

import Image from 'next/image';
import React, { useState } from 'react';
// import { Settings2 } from 'lucide-react';
// import Account from './account';
// import Preferences from './preference';
// import Payment from './payment';

export default function Settings() {
  // const [activeTab, setActiveTab] = useState('account');

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'account':
  //       return <Account />;
  //     case 'preferences':
  //       return <Preferences />;
  //     case 'payment':
  //       return <Payment />;
  //     default:
  //       return <Account />;
  //   }
  // };

  return (
    // <div className="min-h-screen  text-white">
    //   <div className="border-b border-gray-800">
    //     <div className="max-w-6xl mx-auto px-6">
    //       <div className="flex items-center gap-2 py-6">
    //         <Settings2 className="h-6 w-6" />
    //         <h1 className="text-xl font-medium">Settings</h1>
    //       </div>

    //       <div className="flex gap-8 -mb-px">
    //         <button
    //           onClick={() => setActiveTab('account')}
    //           className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
    //             activeTab === 'account'
    //               ? 'border-pink-600 text-white'
    //               : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
    //           }`}
    //         >
    //           Account
    //         </button>
    //         <button
    //           onClick={() => setActiveTab('preferences')}
    //           className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
    //             activeTab === 'preferences'
    //               ? 'border-pink-600 text-white'
    //               : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
    //           }`}
    //         >
    //           Preferences
    //         </button>
    //         <button
    //           onClick={() => setActiveTab('payment')}
    //           className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
    //             activeTab === 'payment'
    //               ? 'border-pink-600 text-white'
    //               : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
    //           }`}
    //         >
    //           Payment
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="max-w-6xl mx-auto px-6 py-8">
    //     {renderContent()}
    //   </div>
    // </div>
    <div className="flex h-screen items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-7/12 gap-3 ">
        <Image
          src="/assets/image/comingsoon.png"
          alt="logo"
          width={200}
          height={200}
        />
        <h1 className="lg:text-2xl md:text-xl  text-lg/6 text-white font-semibold text-center">
          Coming soon
        </h1>
        <p className="lg:text-xl md:text-lg  text-sm/5 text-white text-center font-normal">
          Something exciting is on the way! Stay tuned for the latest updates,
          and be the first to know when we launch. Big things are coming soon!
        </p>
      </div>
    </div>
  );
}
