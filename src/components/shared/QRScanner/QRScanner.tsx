'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { toast } from 'sonner';
import { Camera, CameraOff } from 'lucide-react';
import { useParams } from 'next/navigation';

interface QRResponse {
  userId: string;
  name: string;
  email: string;
  profileImg: string;
  eventName: string;
  eventBannerImg: string;
  eventId: string;
  checkInToken: string;
}

interface User {
  userProfile: {
    id: string;
    name: string;
    profileImg: string | null;
  };
  role: string;
  registrationStatus: 'GOING' | 'PENDING' | 'NOT_GOING';
  paymentStatus: 'FREE' | 'PAID';
  checkedIn: boolean;
  customFields: any[];
}

interface EventUsersResponse {
  data: {
    MEMBER: User[];
  };
}

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [permission, setPermission] = useState(false);
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<string>('qr-reader-' + Math.random().toString(36).substring(7));
  const params = useParams(); // Get dynamic route parameters
  const [users, setUsers] = useState<{
    checkedIn: User[];
    going: User[];
    invited: User[];
  }>({ checkedIn: [], going: [], invited: [] });

  const fetchEventUsers = async () => {
    try {
      const response = await fetch(`/api/v1/events/${params.eventId}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch event users');
      }
      const data: EventUsersResponse = await response.json();

      const checkedInUsers = data.data.MEMBER.filter(user => user.checkedIn);
      const goingUsers = data.data.MEMBER.filter(
        user => !user.checkedIn && user.registrationStatus === 'GOING'
      );
      const invitedUsers = data.data.MEMBER.filter(
        user => !user.checkedIn && user.registrationStatus === 'PENDING'
      );

      setUsers({ checkedIn: checkedInUsers, going: goingUsers, invited: invitedUsers });
    } catch (error) {
      console.error('Error fetching event users:', error);
      toast.error('Failed to load event users.');
    }
  };

  useEffect(() => {
    fetchEventUsers();
  }, []);

  const handleScannerPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setPermission(true);
      setScanning(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setPermission(false);
      toast.error('Please allow camera access to scan QR codes');
    }
  };

  useEffect(() => {
    if (scanning && permission) {
      const isMobile = window.innerWidth <= 768;
      scannerRef.current = new Html5Qrcode(containerRef.current);
      scannerRef.current
        .start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: {
              width: isMobile ? Math.min(window.innerWidth * 0.7, 400) : Math.min(window.innerWidth * 0.8, 800),
              height: isMobile ? Math.min(window.innerWidth * 0.7, 400) : Math.min(window.innerWidth * 0.8, 800),
            },
            aspectRatio: 1.0,
          },
          async (decodedText) => {
            try {
              const isJson = decodedText.trim().startsWith('{') && decodedText.trim().endsWith('}');
              if (!isJson) {
                toast.error('Scanned QR code is not in the expected JSON format.');
                return;
              }

              const parsedData = JSON.parse(decodedText) as QRResponse;
              const isValidQRResponse = (data: any): data is QRResponse => {
                return (
                  typeof data.userId === 'string' &&
                  typeof data.name === 'string' &&
                  typeof data.email === 'string' &&
                  typeof data.eventName === 'string' &&
                  typeof data.eventId === 'string' &&
                  typeof data.checkInToken === 'string'
                );
              };

              if (isValidQRResponse(parsedData)) {
                try {
                  // API call to check-in endpoint
                  const response = await fetch(`/api/v1/events/${parsedData.eventId}/check-in`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      checkInToken: parsedData.checkInToken,
                    }),
                  });

                  if (!response.ok) {
                    throw new Error('Check-in failed');
                  }

                  const checkInResponse = await response.json();
                  console.log('Check-in successful:', checkInResponse);

                  // Update local state after successful check-in
                  const updatedUsers = { ...users };
                  const userIndex = updatedUsers.going.findIndex(user => user.userProfile.id === parsedData.userId);
                  if (userIndex !== -1) {
                    updatedUsers.going[userIndex].checkedIn = true;
                    updatedUsers.checkedIn.push(updatedUsers.going[userIndex]);
                    updatedUsers.going.splice(userIndex, 1);
                  }
                  setUsers(updatedUsers);

                  onScan(decodedText);
                  toast.success('Guest checked in successfully!');
                  setScanning(false);
                } catch (error) {
                  console.error('Check-in error:', error);
                  toast.error('Failed to check in guest. Please try again.');
                }
              } else {
                toast.error('Invalid QR format');
              }
            } catch (error) {
              console.error(' Error processing QR code:', error);
              toast.error('Error processing QR code.');
            }
          },
          (errorMessage) => {
            console.log('QR Scan Error:', errorMessage);
          }
        )
        .catch((err) => {
          console.error('Scanner error:', err);
          toast.error('Scanner error. Please try again.');
        });
    }

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current
          .stop()
          .catch(error => console.error('Error stopping scanner:', error));
      }
    };
  }, [scanning, permission, onScan, users]);

  if (!permission) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-400">Camera access is required to scan QR codes</p>
        <button
          onClick={handleScannerPermission}
          className="px-4 py-2 bg-[#C54B8C] text-white rounded-lg hover:bg-opacity-90 flex items-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Allow Camera Access
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {scanning ? (
        <div className="relative h-full">
          <div
            id={containerRef.current}
            className="h-full flex items-center justify-center"
            style={{
              maxWidth: '100%',
              height: '100%',
              overflow: 'hidden',
              margin: '0 auto',
            }}
          />
          <button
            onClick={() => setScanning(false)}
            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
          >
            <CameraOff className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-bold mb-4">Event Users</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Checked In</h3>
              <ul className="list-disc pl-5">
                {users.checkedIn.map(user => (
                  <li key={user.userProfile.id}>{user.userProfile.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Going</h3>
              <ul className="list-disc pl-5">
                {users.going.map(user => (
                  <li key={user.userProfile.id}>{user.userProfile.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Invited</h3>
              <ul className="list-disc pl-5">
                {users.invited.map(user => (
                  <li key={user.userProfile.id}>{user.userProfile.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={() => setScanning(true)}
            className="mt-4 px-4 py-2 bg-[#C54B8C] text-white rounded-lg hover:bg-opacity-90 flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Start Scanning
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;