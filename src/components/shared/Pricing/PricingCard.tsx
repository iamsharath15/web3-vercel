'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PricingPlan } from '@/constants/index';

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const isPlusPlan: boolean = plan.id === 'plus';

  return (
    <Card
      className={`shadow-lg md:w-6/12 w-full border-none ${
        isPlusPlan ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
      }`}
    >
      <CardHeader className="flex items-center justify-center flex-col">
        <CardTitle
          className={`text-2xl font-bold ${
            isPlusPlan ? 'text-white' : 'text-black'
          }`}
        >
          {plan.name}
        </CardTitle>
        <div
          className={`mt-2 text-6xl font-bold ${
            isPlusPlan ? 'text-white' : 'text-black'
          } `}
        >
          {plan.price}
        </div>
        <p className={` ${isPlusPlan ? 'text-white' : 'text-black'}`}>
          {plan.period}
        </p>
      </CardHeader>

      <CardContent>
        <Button
          variant={isPlusPlan ? 'default' : 'outline'}
          className={`w-full text-lg font-semibold rounded-lg border-2 mt-4 ${
            isPlusPlan
              ? 'bg-[#C54B8C] text-white hover:bg-transparent hover:text-[#C54B8C] border-[#C54B8C]'
              : 'border-[#C54B8C] text-[#C54B8C] hover:bg-[#C54B8C] hover:text-white'
          }`}
        >
          {isPlusPlan ? 'Get Luma Plus' : 'Get Started'}
        </Button>

        <div className="flex items-center justify-center mt-6">
          <div
            className={`w-4/12 h-[2px] bg-gray-800 ${
              isPlusPlan ? 'bg-white' : 'bg-[#DDDDDD]'
            }`}
          ></div>
        </div>

        <div className="mt-6 space-y-3">
          {plan.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`rounded-full p-1 ${
                  isPlusPlan ? 'bg-[#FFFFFF]/15' : '  bg-[#C54B8C]/15'
                } `}
              >
                <Check
                  className={`w-5 h-5  ${
                    isPlusPlan ? 'text-white' : 'text-[#C54B8C]'
                  }`}
                />
              </div>
              <p
                className={`font-medium text-lg ${
                  isPlusPlan ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {feature}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
