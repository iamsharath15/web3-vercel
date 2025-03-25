'use client';

import { ReactNode, use, useEffect, useState } from 'react';
import EventTabs from '@/components/shared/events/EventTabs';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

type UserWithToken = {
  access_token: string;
} & Record<string, any>;

export default function EventLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const [event, setEvent] = useState<{ name: string; eventUrl: string } | null>(
    null
  );
  const [eventId, setEventId] = useState<string | null>(null);

  const { data: session } = useSession();
  const user = session?.user as UserWithToken | undefined;

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setEventId(resolvedParams.eventId);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId || !user?.access_token) return;

      try {
        const response = await fetch(`/api/events/overview/${eventId}`);
        if (!response.ok) throw new Error('Failed to fetch event details');

        const data = await response.json();
        console.log("test",data)
        setEvent({ name: data.data.name, eventUrl: data.data.eventUrl });
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, user?.access_token]);

  if (!user?.access_token || !eventId) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center py-[3%]">
      {event && (
        <div className="flex items-center justify-between my-4 w-11/12">
          <h1 className="text-2xl text-white font-bold">{event.name}</h1>
          <Button className="flex bg-[#343436] hover:bg-white hover:text-black">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`/${event.eventUrl}`}
              className="flex items-center justify-center gap-2"
            >
              Event Page <ArrowUpRight />
            </Link>
          </Button>
        </div>
      )}

      <EventTabs eventId={eventId} />
      <div className="w-11/12">{children}</div>
    </div>
  );
}
