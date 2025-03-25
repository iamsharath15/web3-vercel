'use client';
import React, { useState, useEffect } from 'react';
import { Mail, CheckSquare, Users, Download } from 'lucide-react';
import ActionCard from "@/components/ui/ActionCard";
import CheckIn from '@/components/shared/CheckIn/CheckIn';
import InviteGuests from '@/components/shared/InviteGuests/InviteGuests';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';
import { generateGuestListPDF } from './generatePDF';
import type { EventUsers, InvitedUser } from './types';
import GuestList from './GuestList';
const GuestsTab = () => {
  const params = useParams();
  const eventId = params.eventId as string;
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingInvites, setPendingInvites] = useState<InvitedUser[]>([]);
  const [eventUsers, setEventUsers] = useState<EventUsers>({
    OWNER: [],
    MEMBER: []
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchEventUsers = async () => {
      try {
        const response = await fetch(`/api/v1/events/${eventId}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setEventUsers(data.data);
      } catch (error) {
        console.error('Error fetching event users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventUsers();
  }, [eventId]);

  useEffect(() => {
    const fetchInvitedUsers = async () => {
      try {
        const response = await fetch(`/api/v1/events/${eventId}/admin/invites`);
        if (!response.ok) throw new Error('Failed to fetch invited users');
        const data = await response.json();
        const pendingUsers = data.data.filter((invite: InvitedUser) => invite.status === 'PENDING');
        setPendingInvites(pendingUsers);
      } catch (error) {
        console.error('Error fetching invited users:', error);
      }
    };

    fetchInvitedUsers();
  }, [eventId]);

  const handleDownloadPDF = () => {
    generateGuestListPDF(eventUsers);
  };

  const filteredGuests = [
    ...pendingInvites.filter(invite => 
      invite.email.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(invite => ({
      userProfile: {
        id: invite.email,
        name: invite.email.split('@')[0],
        email: invite.email,
        profileImg: null
      },
      role: invite.role,
      registrationStatus: 'PENDING',
      paymentStatus: null
    })),
    ...(eventUsers?.MEMBER?.filter(user => 
      user.userProfile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.userProfile.email || `${user.userProfile.name}@gmail.com`).toLowerCase().includes(searchQuery.toLowerCase())
    ) || [])
  ];

  const renderGuestList = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C54B8C]" />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C54B8C]"
            />
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download List
          </button>
        </div>

        <div className="space-y-2">
          {filteredGuests.length > 0 ? (
            filteredGuests.map((user) => (
              <div 
                key={user.userProfile.id} 
                className="bg-[#2a2a2a] p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-full bg-[#404040] flex-shrink-0 flex items-center justify-center">
                    {user.userProfile.profileImg ? (
                      <img 
                        src={user.userProfile.profileImg} 
                        alt={user.userProfile.name} 
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <span className="text-[#C54B8C]">
                        {user.userProfile.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white truncate">{user.userProfile.name}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {user.userProfile.email || `${user.userProfile.name}@gmail.com`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${user.registrationStatus === 'GOING' ? 'text-green-500' : 'text-blue-500'}`}>
                    {user.registrationStatus === 'GOING' ? 'Going' : 'Invited'}
                  </span>
                  {user.registrationStatus === 'PENDING' && (
                    <button
                      onClick={() => handleCancelInvite(user.userProfile.email)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-[#3a3a3a]"
                      title="Cancel Invite"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              No guests found matching your search
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleCancelInvite = async (email: string) => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}/admin/invites/cancel?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to cancel invite');
      const updatedInvites = pendingInvites.filter(invite => invite.email !== email);
      setPendingInvites(updatedInvites);
    } catch (error) {
      console.error('Error canceling invite:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard 
          icon={<Mail size={20} />} 
          title="Invite Guests" 
          description="Send invitations via email to your guests"
          isSelected={selectedAction === 'invite'}
          onClick={() => setSelectedAction('invite')} 
        />
        <ActionCard 
          icon={<CheckSquare size={20} />} 
          title="Check-in Guests" 
          description="Scan QR codes to check in your guests"
          isSelected={selectedAction === 'checkin'}
          onClick={() => setSelectedAction('checkin')} 
        />
        <ActionCard 
          icon={<Users size={20} />} 
          title="Guests List" 
          description="View and manage your guest list"
          isSelected={selectedAction === 'list'}
          onClick={() => setSelectedAction('list')} 
        />
      </div>

      <div className="bg-[#303030] bg-opacity-50 rounded-lg p-6">{renderGuestList()}</div>

      {selectedAction === 'checkin' && <CheckIn onClose={() => setSelectedAction(null)} />}
      {selectedAction === 'invite' && <InviteGuests onClose={() => setSelectedAction(null)} />}
      {selectedAction === 'list' && <GuestList onClose={() => setSelectedAction(null)} />}
    </div>
  );
};

export default GuestsTab;
