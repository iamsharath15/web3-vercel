'use client';

import React from 'react';
import PricingCard from '@/components/shared/Pricing/PricingCard';
import { pricingData } from '@/constants/index';

const PricingPage: React.FC = () => {
  return (
    <section
      className=" relative md:pt-[10%] pt-[16%] pb-[5%] flex flex-col items-center justify-center w-full  "
    
    >
        <div
          className="absolute inset-0  bg-gradient-to-b top-0 "
          style={{
            height: '40%',
            zIndex: 0,
            background: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0.1, 0.2, 0.3, 0.99) 100%),
            linear-gradient(to right, 
             #6A5ACD 0%, 
          #C54B8C 50%, 
          #B284BE 100%)
          `,
            backgroundBlendMode: 'multiply',
          }}
        />
      <div className="md:w-9/12 w-10/12 z-10 ">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">Pricing</h1>
          <p className="text-white mt-4 font-medium text-xl">
            Use Luma for free with unlimited events and guests.
            <br />
            Upgrade for more invites, 0% platform fee, and more.
          </p>
        </div>

        <div className="flex w-full  md:flex-row flex-col  gap-6 items-start justify-center">
          {pricingData.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-8 px-[2%]">
          <p className='text-sm text-center text-gray-400'>
            Stripe, our payment processor, charges a credit card fee (typically
            2.9% + 30 cents). The platform fee is on top of the Stripe fee.
            Prices for Luma Plus subscriptions are in US dollars.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
