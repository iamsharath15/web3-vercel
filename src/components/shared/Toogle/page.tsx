'use client';
import { useState } from 'react';

interface ToggleEventsProps {
  onToggle: (isUpcoming: boolean) => void;
}

export default function ToggleEvents({ onToggle }: ToggleEventsProps) {
  const [isUpcoming, setIsUpcoming] = useState(true);

  const handleToggle = (value: boolean) => {
    setIsUpcoming(value);
    onToggle(value);
  };

  return (
    <div className="flex bg-[#1B1B1B] px-3 py-2 rounded-lg">
      <button
        onClick={() => handleToggle(true)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          isUpcoming ? 'bg-[#c54b8c] text-white' : 'text-white/70'
        }`}
      >
        Upcoming
      </button>

      <button
        onClick={() => handleToggle(false)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          !isUpcoming ? 'bg-[#c54b8c] text-white' : 'text-white/70'
        }`}
      >
        Past
      </button>
    </div>
  );
}
