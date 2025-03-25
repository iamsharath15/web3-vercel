// ActionCard.tsx
'use client';
import React from 'react';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const ActionCard = ({ icon, title, description, isSelected, onClick }: ActionCardProps) => {
  return (
    <button
      className={`bg-[#303030] bg-opacity-50 rounded-lg p-4 text-left transition-all hover:bg-opacity-70 ${
        isSelected ? 'ring-2 ring-[#C54B8C]' : ''
      }`}
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-lg bg-[#C54B8C] bg-opacity-20 flex items-center justify-center mb-3">
        <div className="text-[#C54B8C]">{icon}</div>
      </div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  );
};

export default ActionCard;