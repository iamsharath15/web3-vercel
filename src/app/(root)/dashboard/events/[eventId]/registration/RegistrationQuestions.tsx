'use client';
import React, { useState } from 'react';
import { User, ChevronUp, Plus, X } from 'lucide-react';

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

interface RegistrationQuestionsProps {
  formSettings: FormSettings;
  setFormSettings: React.Dispatch<React.SetStateAction<FormSettings>>;
}

const RegistrationQuestions: React.FC<RegistrationQuestionsProps> = ({ formSettings, setFormSettings }) => {
  const [customQuestions, setCustomQuestions] = useState<string[]>(formSettings.customQuestions);
  const [newQuestionText, setNewQuestionText] = useState('');

  type FieldKey = keyof Omit<FormSettings, 'customQuestions'>;

  const toggleField = <K extends keyof FieldSettings>(field: FieldKey, property: K) => {
    setFormSettings((prev) => {
      if (!prev[field]) {
        console.warn(`Field "${field}" does not exist in formSettings.`);
        return prev;
      }

      const updatedField: FieldSettings = {
        ...prev[field],
        [property]: !prev[field][property],
        label:
          property === 'enabled'
            ? (!prev[field].enabled ? 'On' : 'Off')
            : (!prev[field].required ? 'Required' : 'Optional'),
      };

      console.log(`Updated "${field}" field settings:`, updatedField);

      return {
        ...prev,
        [field]: updatedField,
      };
    });
  };

  const addCustomQuestion = () => {
    if (newQuestionText.trim()) {
      setCustomQuestions((prev) => [...prev, newQuestionText]);
      setNewQuestionText('');
      console.log('Added new custom question:', newQuestionText);
    } else {
      const newQuestion = `Question ${customQuestions.length + 1}`;
      setCustomQuestions((prev) => [...prev, newQuestion]);
      console.log('Added new custom question:', newQuestion);
    }
  };

  const removeCustomQuestion = (index: number) => {
    setCustomQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-medium mt-6">Registration Questions</h2>
      <div className="mt-8 bg-[#181818] rounded-lg">
        <div className="bg-[#181818] p-4 rounded-lg mb-4">
          <h3 className="flex items-center space-x-2 text-sm font-medium mb-3">
            <User size={18} className="text-white" />
            <span>Personal Information</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#202020] rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#C54B8C] flex items-center justify-center mr-2">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium">Name</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{formSettings.name.label}</span>
                <div className="flex items-center">
                  <ChevronUp 
                    size={16} 
                    className={`text-gray-400 cursor-pointer ${formSettings.name.enabled ? 'text-[#C54B8C]' : ''}`}
                    onClick={() => toggleField('name', 'required')}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#202020] rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#C54B8C] flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-white">@</span>
                </div>
                <span className="text-sm font-medium">Email</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{formSettings.email.label}</span>
                <div className="flex items-center">
                  <ChevronUp 
                    size={16} 
                    className={`text-gray-400 cursor-pointer ${formSettings.email.enabled ? 'text-[#C54B8C]' : ''}`}
                    onClick={() => toggleField('email', 'required')}
                  />
                </div>
              </div>
            </div> 
            <div className="bg-[#202020] rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#C54B8C] flex items-center justify-center mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Phone</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{formSettings.phone.label}</span>
                <div className="flex items-center">
                  <ChevronUp 
                    size={16} 
                    className={`text-gray-400 cursor-pointer ${formSettings.phone.enabled ? 'text-[#C54B8C]' : ''}`}
                    onClick={() => toggleField('phone', 'enabled')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#181818] p-4 rounded-lg mb-4">
          <h3 className="flex items-center space-x-2 text-sm font-medium mb-3">
            <User size={18} className="text-white" />
            <span>Web3 Identity</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#202020] rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#C54B8C] flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-white">ETH</span>
                </div>
                <span className="text-sm font-medium">ETH Address</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{formSettings.ethAddress.label}</span>
                <div className="flex items-center">
                  <ChevronUp 
                    size={16} 
                    className={`text-gray-400 cursor-pointer ${formSettings.ethAddress.enabled ? 'text-[#C54B8C]' : ''}`}
                    onClick={() => toggleField('ethAddress', 'enabled')}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#202020] rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#C54B8C] flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-white">SOL</span>
                </div>
                <span className="text-sm font-medium">SOL Address</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{formSettings.solAddress.label}</span>
                <div className="flex items-center">
                  <ChevronUp 
                    size={16} 
                    className={`text-gray-400 cursor-pointer ${formSettings.solAddress.enabled ? 'text-[#C54B8C]' : ''}`}
                    onClick={() => toggleField('solAddress', 'enabled')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#181818] p-4 rounded-lg mb-4">
          <h3 className="flex items-center space-x-2 text-sm font-medium mb-3">
            <User size={18} className="text-white" />
            <span>Custom Questions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#202020] rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#C54B8C] flex items-center justify-center mr-2">
                  <Plus size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium">Add Questions</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-2">
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Enter question..."
                    className="w-full bg-[#252525] text-white text-sm p-1 rounded border border-gray-700 focus:outline-none focus:border-[#C54B8C]"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#252525] transition-colors"
                    onClick={addCustomQuestion}
                  >
                    <Plus size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {customQuestions.map((question, index) => (
            <div key={index} className="mt-3 bg-[#202020] rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#C54B8C] flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-white">Q</span>
                </div>
                <span className="text-sm font-medium">{question}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Required</span>
                <div className="flex items-center space-x-2">
                  <ChevronUp
                    size={16}
                    className="text-[#C54B8C] cursor-pointer"
                  />
                  <button
                    className="w-6 h-6 rounded-full border border-[#C54B8C] flex items-center justify-center hover:text-white transition-colors"
                    onClick={() => removeCustomQuestion(index)}
                  >
                    <X size={14} className="text-[#C54B8C]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationQuestions;