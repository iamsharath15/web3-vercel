'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, MapPinCheck } from 'lucide-react';
import { format, parseISO, differenceInSeconds, isBefore } from 'date-fns';
import FlipClock from './FlipClock';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface EventOwner {
  name: string;
  profileImg: string;
}

interface EventDetails {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  slug: string;
  owner: EventOwner;
  isOnline: boolean;
}

interface EventData {
  event: EventDetails;
  role: 'OWNER' | 'MEMBER' | null;
  invitationStatus: 'PENDING' | 'ACCEPTED' | null;
  registrationStatus: string | null;
  paymentStatus: string | null;
}

interface EventCardProps {
  eventData: EventData;
  showTimer: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ eventData, showTimer }) => {
  const router = useRouter();
  const now = new Date();
  const startDate = parseISO(eventData.event.startTime);
  const endDate = parseISO(eventData.event.endTime);

  const day = format(startDate, 'EEE');
  const date = format(startDate, 'dd');
  const formattedStartTime = format(startDate, 'HH:mm');
  const formattedEndTime = format(endDate, 'HH:mm');
  const isToday = format(now, 'yyyy-MM-dd') === format(startDate, 'yyyy-MM-dd');
  const hasEnded = isBefore(endDate, now);
  const eventStatus = eventData.event.isOnline ? 'Online' : 'Offline';

  const [remainingTime, setRemainingTime] = useState(
    Math.max(differenceInSeconds(startDate, now), 0)
  );

  useEffect(() => {
    if (remainingTime <= 0) return;
    const interval = setInterval(() => {
      setRemainingTime((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleInviteResponse = async (response: 'ACCEPT' | 'DECLINE') => {
    try {
      const res = await fetch(
        `/api/v1/events/${eventData.event.id}/invites/respond?action=${response.toLowerCase()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!res.ok) throw new Error('Failed to update invitation status');
      window.location.reload();
    } catch (error) {
      console.error('Error updating invitation status:', error);
    }
  };

  const renderActionContent = () => {
    if (eventData.role === 'OWNER') {
      return (
        <Button className="p-[6%] bg-[#343436] group hover:bg-white">
          <Link className="flex gap-2 items-center justify-center" href={`/dashboard/events/${eventData.event.id}/overview`}>
            <h2 className="text-white text-center group-hover:text-black">Manage Event</h2>
            <ArrowRight className='group-hover:text-black' />
          </Link>
        </Button>
      );
    }
    if (eventData.invitationStatus === 'PENDING') {
      return (
        <div className="flex gap-2">
          <Button onClick={() => handleInviteResponse('ACCEPT')} className="bg-pink-500 hover:bg-pink-600">Accept</Button>
          <Button onClick={() => handleInviteResponse('DECLINE')} className="bg-black hover:bg-gray-900">Decline</Button>
        </div>
      );
    }
    if (eventData.invitationStatus === 'ACCEPTED') {
      if (hasEnded) return <h2 className="text-red-400">Event Ended</h2>;
      return remainingTime > 0 ? <FlipClock remainingTime={remainingTime} /> : <h2 className="text-yellow-400">Ongoing Event</h2>;
    }
    return null;
  };

  return (
    <div className="bg-[#1B1B1B] rounded-lg sm:p-[3%] p-[6%] shadow-md w-full mt-4">
      <div className="flex justify-between items-center md:flex-row flex-col ">
        <div className="flex justify-between md:w-8/12 w-full">
          <div className="flex md:w-2/12 w-4/12">
            <div className="flex flex-col items-center justify-center pr-4">
              <span className={`text-2xl font-bold ${isToday ? 'text-pink-400' : 'text-white'}`}>{day}</span>
              <span className={`text-5xl ${isToday ? 'text-pink-400' : 'text-white'}`}>{date}</span>
            </div>
            <div className={`${isToday ? 'bg-pink-400' : 'bg-white'} w-[2px] h-auto`}></div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h1 className="font-semibold text-white lg:text-[26px] md:text-[22px] text-[18px]">
              {eventData.event.name}
            </h1>
            <div className="flex items-center gap-2">
              <Clock className={isToday ? 'text-pink-400' : 'text-white'} size={18} />
              <span className="text-white text-[16px]">{formattedStartTime} - {formattedEndTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinCheck className={isToday ? 'text-pink-400' : 'text-white'} size={18} />
              <span className="text-white text-[16px]">{eventStatus}</span>
            </div>
          </div>
        </div>
        <div className="md:w-4/12 w-10/12 flex items-center justify-center">
          {renderActionContent()}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
