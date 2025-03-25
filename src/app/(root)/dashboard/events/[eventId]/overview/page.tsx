'use client';
import React, { useEffect, useState } from 'react';
import {
  FaLink,
  FaEnvelope,
  FaUserPlus,
  FaComment,
  FaCode,
  FaTimes,
} from 'react-icons/fa';
import EventURL from './EventURL';
import { useParams } from 'next/navigation';
import CancelEvent from './CancelEvent';
import { useSession } from 'next-auth/react';
import EmbedSection from './EmbedSection';


const Page = () => { // Rename Overview to Page
  const params = useParams();
  const eventId = params?.eventId as string; // ✅ Ensure eventId is a string
  const [eventUrl, setEventUrl] = useState<string>(''); // ✅ Default to empty
  useEffect(() => {
    if (!eventId) return;

    const fetchEventUrl = async () => {
      try {
        const response = await fetch(`/api/events/overview/${eventId}`);

        if (!response.ok) throw new Error('Failed to fetch event URL');

        const data = await response.json();
        setEventUrl(data?.data?.eventUrl || '');
      } catch (error) {
        console.error('Error fetching event URL:', error);
      }
    };

    fetchEventUrl();
  }, [eventId]);

  return (
    <>
      <EventURL eventUrl={eventUrl} />
      {/* <InvitesSection /> */}
      {/* <HostsSection /> */}
      {/* <FeedbackSection /> */}
      <EmbedSection eventUrl={eventUrl} />
      <CancelEvent eventId={eventId} />
    </>
  );
};

export default Page; // Export Page as default