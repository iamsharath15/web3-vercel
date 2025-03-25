'use client';
import ToggleEvents from '@/components/shared/Toogle/page';
import React, { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { format, parseISO, isBefore, compareAsc } from 'date-fns';
import EventCard from '@/components/shared/events/EventCard';

interface EventOwner {
  name: string;
  profileImg: string;
}

// Update interfaces to include invitation status
interface EventDetails {
  name: string;
  startTime: string;
  endTime: string;
  owner: EventOwner;
  id: string;
  category: string;
  description: string;
  bannerImage: string;
  status: string;
  isOnline: boolean;
  slug: string;  // Added missing property
}

interface EventData {
  event: EventDetails;
  role: 'OWNER' | 'MEMBER' | null;
  invitationStatus: 'PENDING' | 'ACCEPTED' | null;
  registrationStatus: string | null;
  paymentStatus: string | null;
}

interface GroupedEvents {
  month: string;
  invitedEvents: EventData[];
  pendingEvents: EventData[];
  ownedEvents: EventData[];  // Added owned events
}
interface CustomUser {
  access_token: string;
}

const Page: React.FC = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isUpcoming, setIsUpcoming] = useState(true);

  const token = session?.user as CustomUser | undefined;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!token?.access_token) return;

      try {
        const response = await fetch('/api/events', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch events');

        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [session]);
  console.log(events);
  const sortedMonths: GroupedEvents[] = useMemo(() => {
    const now = new Date();

    const filteredEvents = events.filter((event) => {
      return isUpcoming
        ? isBefore(now, parseISO(event.event.endTime))
        : isBefore(parseISO(event.event.endTime), now);
    });

    const groupedEvents = filteredEvents.reduce<Record<string, { invited: EventData[], pending: EventData[], owned: EventData[] }>>(
      (acc, event) => {
        const monthKey = format(parseISO(event.event.startTime), 'yyyy-MM');
        if (!acc[monthKey]) {
          acc[monthKey] = { invited: [], pending: [], owned: [] };
        }
        
        if (event.role === 'OWNER') {
          acc[monthKey].owned.push(event);
        } else if (event.invitationStatus === 'ACCEPTED') {
          acc[monthKey].invited.push(event);
        } else if (event.invitationStatus === 'PENDING') {
          acc[monthKey].pending.push(event);
        }
        
        return acc;
      },
      {}
    );

    return Object.keys(groupedEvents)
      .sort()
      .map((monthKey) => ({
        month: format(parseISO(`${monthKey}-01`), 'MMM'),
        ownedEvents: groupedEvents[monthKey].owned.sort((a, b) =>
          compareAsc(parseISO(a.event.startTime), parseISO(b.event.startTime))
        ),
        invitedEvents: groupedEvents[monthKey].invited.sort((a, b) =>
          compareAsc(parseISO(a.event.startTime), parseISO(b.event.startTime))
        ),
        pendingEvents: groupedEvents[monthKey].pending.sort((a, b) =>
          compareAsc(parseISO(a.event.startTime), parseISO(b.event.startTime))
        ),
      }));
  }, [events, isUpcoming]);

  return (
    <section className="eventsPage w-full flex flex-col items-center">
      <div className="w-11/12 flex items-center justify-between">
        <div className="flex flex-col py-6">
          <h1 className="sm:text-2xl text-lg font-bold text-white">
            My Events
          </h1>
          <p className="text-gray-400 sm:text-lg text-sm">
            Here are your event details
          </p>
        </div>
        <ToggleEvents onToggle={setIsUpcoming} />
      </div>

      <div className="flex flex-col w-11/12 mx-auto">
        {sortedMonths.length > 0 ? (
          sortedMonths.map(({ month, ownedEvents, invitedEvents, pendingEvents }) => (
            <div key={month} className="rounded-lg shadow-lg mt-4">
              <h2 className="text-2xl font-bold text-white mb-4">{month}</h2>
              
              {ownedEvents.length > 0 && (
                <div className="mb-6">
                  {ownedEvents.map((event, index) => (
                    <EventCard
                      key={`${event.event.id}-owned-${index}`}
                      eventData={event}
                      showTimer={true}
                    />
                  ))}
                </div>
              )}

              {pendingEvents.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">Invites</h3>
                  {pendingEvents.map((event, index) => (
                    <EventCard
                      key={`${event.event.id}-pending-${index}`}
                      eventData={event}
                      showTimer={false}
                    />
                  ))}
                </div>
              )}

              {invitedEvents.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">My Events</h3>
                  {invitedEvents.map((event, index) => (
                    <EventCard
                      key={`${event.event.id}-invited-${index}`}
                      eventData={event}
                      showTimer={true}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-4">
            No {isUpcoming ? 'upcoming' : 'past'} events found.
          </p>
        )}
      </div>
    </section>
  );
};

export default Page;
