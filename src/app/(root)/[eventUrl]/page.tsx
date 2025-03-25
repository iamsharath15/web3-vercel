'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RegisterButton from './RegisterButton';
import Image from 'next/image';
import EventTime from "./EventTime"; 

interface Owner {
  id: string;
  name: string;
  profileImg?: string;
}

interface EventDetailsType {
  id: string;
  name: string;
  bannerImage: string;
  category: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  venue: string;
  description: string;
  owner: Owner | Owner[];
}

const EventDetails = () => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const eventUrl = params?.eventUrl as string | undefined;

  useEffect(() => {
    if (!eventUrl) return;

    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventUrl}`);
        if (!response.ok) throw new Error('Failed to fetch event details');

        const result = await response.json();
        setEvent(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventUrl]);
  console.log(event);
  if (loading)
    return <p className="text-center text-white">Loading event details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="bg-slate-600 w-full flex items-start justify-center h-screen">
        <div className="md:w-10/12 w-11/12 md:flex-row flex flex-col items-start justify-center">
          <div className="md:w-5/12 w-full p-2">
            <div>
              <img
                src={event?.bannerImage}
                alt={event?.name}
                className=" object-cover rounded-lg"
              />
            </div>
            <div className="py-4">
              <h1 className="border-b pb-2 text-white">Hosted By</h1>
              <div className="py-4">
                {Array.isArray(event?.owner) ? (
                  event.owner.map((owner: Owner) => (
                    <div key={owner.id} className="flex items-center gap-2">
                      {owner.profileImg ? (
                        <Image
                          src={owner.profileImg}
                          alt={owner.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                          {owner.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <h1 className="text-white">{owner.name}</h1>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2">
                    {event?.owner?.profileImg ? (
                      <Image
                        src={event.owner.profileImg}
                        alt={event.owner.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                        {event?.owner?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h1 className="text-white">{event?.owner?.name}</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-start">
              <h1 className="border text-white rounded-full p-1 px-3">
                {' '}
                # {event?.category}
              </h1>
            </div>
          </div>
          <div className="md:w-7/12 w-full p-2">
            <h1 className="text-3xl font-bold">{event?.name}</h1>
              {/* Pass event startTime, endTime, and timeZone to EventTime component */}
          {event?.startTime && event?.endTime && event?.timeZone && (
            <EventTime startTime={event.startTime} endTime={event.endTime} timeZone={event.timeZone} />
          )}

        
          <p className="text-gray-200">
            <strong>Venue:</strong>{' '}
            {event?.venue ? (
              <a
                href={event.venue}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline"
              >
                View Location
              </a>
            ) : (
              'Not Available'
            )}
          </p>
          {event?.id && <RegisterButton eventId={event.id} />}
          <div className="flex flex-col items-start justify-center mt-4">
            <h2 className="text-xl font-semibold text-white">About Event</h2>
            <p className="text-gray-300 mt-2">{event?.description || 'No description available.'}</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
