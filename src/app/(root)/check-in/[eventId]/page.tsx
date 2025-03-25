'use client';
import React, { useState, useEffect } from 'react';
import { Search, QrCode, Users, ArrowLeft, Filter, Download } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import QRScanner from '@/components/shared/QRScanner/QRScanner';
import { toast } from 'sonner';
import Link from 'next/link';
import * as XLSX from 'xlsx'; // Import the xlsx library for Excel export

interface SessionUser {
  name?: string;
  profileImg?: string;
  email?: string;
}
interface Session {
  user?: {
    userData?: SessionUser;
  };
}
interface Invite {
  invitee: null;
  email: string;
  role: string;
  status: string;
  inviteToken: string;
}
interface EventUser {
  userProfile: {
    id: string;
    name: string;
    profileImg: string | null;
    email: string;
  };
  role: 'OWNER' | 'MEMBER';
  registrationStatus: string | null;
  paymentStatus: string | null;
  checkedIn: boolean;
  customFields: any[];
}

const CheckInScanner = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId as string;
  const { data: session } = useSession();
  const user = (session as Session)?.user?.userData || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedGuests, setScannedGuests] = useState<any[]>([]);
  const [pendingInvites, setPendingInvites] = useState<Invite[]>([]);
  const [eventUsers, setEventUsers] = useState<EventUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCheckedIn, setFilterCheckedIn] = useState<'ALL' | 'CHECKED_IN' | 'NOT_CHECKED_IN'>('ALL');

  // Fetch pending invites
  const fetchPendingInvites = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}/admin/invites`);
      if (!response.ok) throw new Error('Failed to fetch pending invites');
      const data = await response.json();
      const pendingUsers = data.data.filter((invite: Invite) => invite.status === 'PENDING');
      setPendingInvites(pendingUsers);
    } catch (error) {
      console.error('Error fetching pending invites:', error);
    }
  };

  // Fetch registered event users
  const fetchEventUsers = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}/users`);
      if (!response.ok) throw new Error('Failed to fetch event users');
      const data = await response.json();
      setEventUsers(data.data.MEMBER); // Only include MEMBER users for the guest list
    } catch (error) {
      console.error('Error fetching event users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingInvites();
    fetchEventUsers();
  }, [eventId]);

  // Combine pending invites and registered users for filtering
  const filteredGuests = [
    ...pendingInvites
      .filter((invite) =>
        invite.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((invite) => ({
        userProfile: {
          id: invite.email,
          name: invite.email.split('@')[0],
          email: invite.email,
          profileImg: null,
        },
        role: invite.role,
        registrationStatus: 'INVITED',
        paymentStatus: null,
        checkedIn: false, // Add default checkedIn value
      })),
    ...(eventUsers?.filter(
      (user) =>
        (user.userProfile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.userProfile.email || `${user.userProfile.name}@gmail.com`)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (filterCheckedIn === 'ALL' ||
          (filterCheckedIn === 'CHECKED_IN' && user.checkedIn) ||
          (filterCheckedIn === 'NOT_CHECKED_IN' && !user.checkedIn))
    ) || []),
  ];

  // Function to download filtered guests as an Excel file
  const handleDownload = () => {
    const worksheetData = filteredGuests.map((guest) => ({
      Name: guest.userProfile.name,
      Email: guest.userProfile.email,
      Status: guest.checkedIn ? 'Checked In' : 'Not Checked In',
    }));

    // Create a workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Guest List');

    // Export the workbook as an Excel file
    XLSX.writeFile(workbook, 'checkin-status.xlsx');
    toast.success('Excel file downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-2 sm:p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="text-[#C54B8C] cursor-pointer"
              onClick={() => router.push(`/dashboard/events/${eventId}/guests`)}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h1 className="text-xl sm:text-2xl font-semibold">
                <span className="text-[#C54B8C]">{user.name || 'User'}</span>
              </h1>
              <span className="text-gray-400 text-xs sm:text-sm">Started 1 hours ago</span>
            </div>
          </div>
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="w-full sm:w-auto bg-[#2a2a2a] px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition-colors flex items-center justify-center gap-2"
          >
            {showScanner ? (
              <>
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-gray-400 text-sm sm:text-base">Guests</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-gray-400 text-sm sm:text-base">Scan</span>
              </>
            )}
          </button>
        </div>
        {showScanner ? (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="relative w-full h-[300px] sm:h-[500px]">
                <QRScanner onScan={(data) => {}} />
              </div>
            </div>
            <div className="bg-[#2a2a2a] rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="text-[#4CAF50]">{scannedGuests.length} Checked In</div>
                  <div className="text-gray-400">
                    {filteredGuests.filter((g) => g.registrationStatus === 'GOING').length} Going
                  </div>
                  <div className="text-[#2196F3]">{filteredGuests.length} Invited</div>
                </div>
              </div>
              <div className="w-full h-1 bg-[#4CAF50] rounded-full mt-3 sm:mt-4" />
            </div>
            <Link
              href={`/dashboard/events/${eventId}/guests`}
              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm sm:text-base"
            >
              <span>Manage Event Page</span>
              <ArrowLeft size={16} className="transform rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div className="relative mb-4 sm:mb-6">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search for a Guest..."
                className="w-full bg-[#2a2a2a] text-white rounded-lg pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C54B8C]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#C54B8C] text-white px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-[#b03e72] transition-colors"
                onClick={() => {} /* Placeholder for search logic */}
              >
                Search
              </button>
            </div>
            <div className="bg-[#2a2a2a] rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    className={`text-xs sm:text-sm px-2 py-1 rounded-md ${
                      filterCheckedIn === 'ALL' ? 'bg-[#C54B8C] text-white' : 'bg-[#2a2a2a] text-gray-400'
                    } hover:bg-[#b03e72] transition-colors`}
                    onClick={() => setFilterCheckedIn('ALL')}
                  >
                    All
                  </button>
                  <button
                    className={`text-xs sm:text-sm px-2 py-1 rounded-md ${
                      filterCheckedIn === 'CHECKED_IN' ? 'bg-[#C54B8C] text-white' : 'bg-[#2a2a2a] text-gray-400'
                    } hover:bg-[#b03e72] transition-colors`}
                    onClick={() => setFilterCheckedIn('CHECKED_IN')}
                  >
                    Checked In
                  </button>
                  <button
                    className={`text-xs sm:text-sm px-2 py-1 rounded-md ${
                      filterCheckedIn === 'NOT_CHECKED_IN' ? 'bg-[#C54B8C] text-white' : 'bg-[#2a2a2a] text-gray-400'
                    } hover:bg-[#b03e72] transition-colors`}
                    onClick={() => setFilterCheckedIn('NOT_CHECKED_IN')}
                  >
                    Not Checked In
                  </button>
                </div>
                <button
                  className="bg-[#C54B8C] text-white px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-[#b03e72] transition-colors flex items-center gap-2"
                  onClick={handleDownload}
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
              <div className="space-y-2">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C54B8C]" />
                  </div>
                ) : filteredGuests?.length > 0 ? (
                  filteredGuests.map((user) => (
                    <div
                      key={user.userProfile.id}
                      className="bg-[#1a1a1a] p-4 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center">
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
                        <div>
                          <p className="font-medium text-white">{user.userProfile.name}</p>
                        </div>
                      </div>
                      <span className={`text-sm ${user.checkedIn ? 'text-green-500' : 'text-gray-400'}`}>
                        {user.checkedIn ? 'Checked In' : 'Not Checked In'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">No guests found</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInScanner;