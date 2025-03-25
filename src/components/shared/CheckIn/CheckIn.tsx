'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CheckInProps {
  onClose: () => void;
}

const CheckIn: React.FC<CheckInProps> = ({ onClose }) => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId;

  const handleOpenWebScanner = () => {
    router.push(`/check-in/${eventId}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 w-full max-w-[95%] sm:max-w-md mx-auto relative">
        <button 
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-[#C54B8C]" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Check In Guests</h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 px-2 sm:px-0">
            You can check in guests with our web scanner, or with our iOS and Android apps.
          </p>
          <div className="w-full space-y-2 sm:space-y-3">
            <Button 
              onClick={handleOpenWebScanner}
              className="w-full bg-white text-black hover:bg-gray-200 text-sm sm:text-base py-2 sm:py-3"
            >
              Open Web Scanner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;