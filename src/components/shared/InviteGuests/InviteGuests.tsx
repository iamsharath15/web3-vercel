'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

interface InviteGuestsProps {
  onClose: () => void;
}

const InviteGuests: React.FC<InviteGuestsProps> = ({ onClose }) => {
  const params = useParams();
  const eventId = params.eventId as string;
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendInvite = async () => {
    try {
      setIsLoading(true);
      const trimmedEmail = email.trim();

      if (!trimmedEmail) {
        toast.error('Please enter an email address');
        setIsLoading(false);
        return;
      }
      const payload = {
        inviteType: "MEMBER",
        recipients: [trimmedEmail],
      };
      console.log("Payload being sent:", JSON.stringify(payload, null, 2)); 
      const response = await fetch(`/api/v1/events/${eventId}/admin/invites/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to send invite: ${response.status} ${response.statusText}`);
      }

      toast.success('Invitation sent successfully!');
      setEmail('');
      onClose();
    } catch (error) {
      console.error('Error sending invite:', error);
      toast.error('Failed to send invitation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[#404040]">
          <h2 className="text-xl text-white font-semibold">Invite Guest</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#404040] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-[#1a1a1a] rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C54B8C] placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Import CSV</label>
              <div className="border-2 border-dashed border-[#404040] rounded-lg p-8 text-center">
                <p className="text-white mb-2">Drop your CSV file here or</p>
                <button className="text-[#C54B8C] hover:text-[#d65e9d] transition-colors">
                  browse files
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#404040] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            onClick={handleSendInvite}
            disabled={isLoading}
            className="px-4 py-2 bg-[#C54B8C] text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? 'Sending...' : 'Send Invite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteGuests;