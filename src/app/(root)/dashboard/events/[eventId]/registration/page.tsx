'use client';
import React, { useState } from 'react';
import { User, Users, ClipboardList,} from 'lucide-react';
import ActionCard from '@/components/ui/ActionCard';
import RegistrationQuestions from './RegistrationQuestions';

interface FieldSettings {
  enabled: boolean;
  required: boolean;
  label: string;
}

interface FormSettings {
  name: FieldSettings;
  email: FieldSettings;
  phone: FieldSettings;
  ethAddress: FieldSettings;
  solAddress: FieldSettings;
  customQuestions: string[];
}

const RegistrationTab = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [formSettings, setFormSettings] = useState<FormSettings>({
    name: { enabled: true, required: true, label: 'Full Name' },
    email: { enabled: true, required: true, label: 'Required' },
    phone: { enabled: false, required: false, label: 'Off' },
    ethAddress: { enabled: false, required: false, label: 'Off' },
    solAddress: { enabled: false, required: false, label: 'Off' },
    customQuestions: [],
  });

  const handleCardClick = (cardTitle: string) => {
    setSelectedCard(cardTitle);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formSettings);
  };

  return (
    <div className="bg-[#101010] bg-opacity-50 rounded-lg p-4 md:p-6 text-white">
      <div>
        <h2 className="text-xl font-medium mb-4">Registration Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            icon={<Users size={20} />}
            title="Registrations"
            description="Allow Attendees To Register To Your Event"
            isSelected={selectedCard === "Registrations"}
            onClick={() => handleCardClick("Registrations")}
          />
          <ActionCard
            icon={<ClipboardList size={20} />}
            title="Event Capacity"
            description="Set A Maximum Number Of Attendees"
            isSelected={selectedCard === "Event Capacity"}
            onClick={() => handleCardClick("Event Capacity")}
          />
        </div>
      </div>
      <RegistrationQuestions formSettings={formSettings} setFormSettings={setFormSettings} />
      <div className="flex justify-end mt-6">
        <button
          className="bg-[#C54B8C] hover:bg-[#a33b73] text-white px-6 py-2 rounded-md transition-colors"
          onClick={handleSubmit}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default RegistrationTab;