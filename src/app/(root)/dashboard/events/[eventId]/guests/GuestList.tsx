'use client';
import { Search, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { EventUsers, InvitedUser } from './types';

interface GuestListProps {
  onClose: () => void;
}

type StatusType = 'all' | 'invited' | 'going' | 'checkedin';

const GuestList = ({ onClose }: GuestListProps) => {
  const params = useParams();
  const eventId = params.eventId as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusType>('all');
  const [pendingInvites, setPendingInvites] = useState<InvitedUser[]>([]);
  const [eventUsers, setEventUsers] = useState<EventUsers>({ OWNER: [], MEMBER: [] });
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

    const fetchInvitedUsers = async () => {
      try {
        const response = await fetch(`/api/v1/events/${eventId}/admin/invites`);
        if (!response.ok) throw new Error('Failed to fetch invited users');
        const data = await response.json();
        setPendingInvites(data.data.filter((invite: InvitedUser) => invite.status === 'PENDING'));
      } catch (error) {
        console.error('Error fetching invited users:', error);
      }
    };

    fetchEventUsers();
    fetchInvitedUsers();
  }, [eventId]);

  const handleCancelInvite = async (email: string) => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}/admin/invites/cancel?email=${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to cancel invite');

      setPendingInvites(pendingInvites.filter((invite) => invite.email !== email));
    } catch (error) {
      console.error('Error canceling invite:', error);
    }
  };

  const filteredGuests = [
    ...pendingInvites
      .filter((invite) => invite.email.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((invite) => ({
        name: invite.email.split('@')[0],
        email: invite.email,
        color: 'bg-blue-500',
        status: 'invited',
      })),
    ...(eventUsers?.MEMBER?.filter(
      (user) =>
        user.userProfile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.userProfile.email || `${user.userProfile.name}@gmail.com`)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    ).map((user) => ({
      name: user.userProfile.name,
      email: user.userProfile.email || `${user.userProfile.name}@gmail.com`,
      color: 'bg-green-500',
      status: user.registrationStatus.toLowerCase(),
    })) || []),
  ].filter((guest) => (selectedStatus === 'all' ? true : guest.status === selectedStatus));
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C54B8C]" />
      </div>
    );
  }
  const getStatusCount = (status: StatusType) =>
    status === 'all' ? filteredGuests.length : filteredGuests.filter((guest) => guest.status === status).length;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-3 border-b border-[#2a2a2a]">
          <h2 className="text-white text-base">Guest List</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row h-[500px] md:h-[600px] overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#2a2a2a] p-2">
            <h3 className="px-3 text-xs text-gray-400 font-medium mb-1">STATUS</h3>
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {(['all', 'invited', 'going', 'checkedin'] as StatusType[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex-shrink-0 md:flex-shrink px-3 py-1.5 rounded flex items-center justify-between gap-2 md:w-full ${
                    selectedStatus === status ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a]'
                  }`}
                >
                  <span className="text-sm text-white capitalize whitespace-nowrap">{status}</span>
                  <span className="text-xs text-gray-400">{getStatusCount(status)}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Right Content */}
          <div className="flex-1 p-3 min-h-0 flex flex-col">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search Guests"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 pl-9 bg-[#2a2a2a] text-white rounded focus:outline-none text-sm"
              />
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              {filteredGuests.map((guest, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-[#2a2a2a] mb-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 flex-shrink-0 rounded-full ${guest.color} flex items-center justify-center`}>
                      <span className="text-white text-sm">{guest.name[0].toUpperCase()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white truncate">{guest.name}</p>
                      <p className="text-xs text-gray-400 truncate">{guest.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className={`text-sm ${guest.status === 'going' ? 'text-green-500' : 'text-blue-500'} capitalize`}>
                      {guest.status}
                    </span>
                    {guest.status === 'invited' && (
                      <button
                        onClick={() => handleCancelInvite(guest.email)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-[#3a3a3a]"
                        title="Cancel Invite"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[#2a2a2a] p-3 flex justify-end">
          <button className="px-3 py-1.5 bg-[#2a2a2a] text-white rounded hover:bg-[#3a3a3a] text-sm">
            NWEB4
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestList;
