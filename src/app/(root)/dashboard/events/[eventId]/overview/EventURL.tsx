'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FaShareAlt } from 'react-icons/fa';
import { Copy, Pencil } from 'lucide-react';
import { socialPlatforms } from '@/constants';

interface EventURLProps {
  eventUrl: string;
}

export const EventURL = ({ eventUrl }: EventURLProps) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };
  return (
    <Card className="w-full space-y-2 rounded-xl bg-[#171717] md:p-[4%] p-[8%]">
      <h2 className="lg:text-2xl md:text-xl text-lg font-medium text-white">
        🔗 Event Page URL
      </h2>
      <p className="lg:text-l/6 md:text-base/6 py-[1%] text-sm/5 text-[#D4C2CB]">
        When you choose a new URL, the current one will no longer work. Do not
        change your URL if you have already shared the event.
      </p>
      <h2 className="text-pink-500 lg:text-xl md:text-lg text-sm font-medium">
        Public URL
      </h2>
      <div className="flex items-center gap-2 border-2 rounded-lg">
        <Input
          className="text-black placeholder:text-black"
          defaultValue={eventUrl ?? ''}
          placeholder={eventUrl ? eventUrl : 'Enter new URL'}
        />
        <Button
          className="bg-[#ec4899] hover:bg-[#ec4899bd] lg:text-lg md:text-base text-sm font-medium"
          onClick={() => setShowUpdateModal(true)}
        >
          <Pencil />
        </Button>
        <Button
          className="bg-[#ec4899] hover:bg-[#ec4899bd] text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowShareModal(true)}
        >
          <FaShareAlt className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent className="bg-[#171717] border-none py-[2%] rounded-lg text-white max-w-md mx-auto text-center">
          <DialogTitle className="lg:text-xl text-lg font-medium">
            🚀 Update Feature Coming Soon!
          </DialogTitle>
          <p className="text-sm text-gray-300 font-medium py-[2%]">
            We’re working on the update feature. Stay tuned!
          </p>
          <Button
            className="py-[4%] bg-[#ec4899] hover:bg-[#ec4899bd] "
            onClick={() => setShowUpdateModal(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="bg-[#171717] border-none p-6 rounded-lg text-white max-w-md mx-auto">
          <DialogTitle className="text-lg font-semibold">
            Share This Event
          </DialogTitle>

          <div className="flex gap-4 mt-2">
            {socialPlatforms.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                className="w-3/12"
                href={url(eventUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-col items-center justify-center hover:bg-[#2d2d2d] p-4 rounded-lg group">
                  <Icon className="text-[#d2d4d7] w-10 h-10 group-hover:text-[#ec4899bd]" />
                  <p className="text-[#d2d4d7] pt-2 group-hover:text-[#ec4899bd]">
                    {name}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Copy Link */}
          <div className="mt-4 bg-[#131517] p-2 flex justify-between items-center border-[1px] border-[#d2d4d7] rounded-md">
            <span className="text-gray-300 text-sm truncate">{eventUrl}</span>
            <Button
              className="bg-[#d2d4d7] hover:bg-[#ec4899bd] px-2 py-1 text-black hover:text-white"
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : <Copy className="w-10 h-10" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EventURL;
