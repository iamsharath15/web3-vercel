import React from 'react';

interface FlipClockProps {
  remainingTime: number;
}

const FlipClock: React.FC<FlipClockProps> = ({ remainingTime }) => {
  const isToday = remainingTime < 24 * 3600; // Less than 24 hours remaining

  const timeUnits = [
    { label: 'DAYS', value: Math.floor(remainingTime / (24 * 3600)) },
    { label: 'HRS', value: Math.floor((remainingTime % (24 * 3600)) / 3600) },
    { label: 'MIN', value: Math.floor((remainingTime % 3600) / 60) },
    { label: 'SEC', value: remainingTime % 60 },
  ];

  return (
    <div className="flex space-x-2 mt-2">
      {timeUnits.map(({ label, value }, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-14 h-16 text-white text-3xl font-bold flex items-center justify-center rounded-md shadow-lg bg-[#343436]`}
          >
            <span className={`${isToday ? 'text-white' : 'text-white'}`}>
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span
            className={`${isToday ? 'text-white' : 'text-white'} text-xs mt-1`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FlipClock;
