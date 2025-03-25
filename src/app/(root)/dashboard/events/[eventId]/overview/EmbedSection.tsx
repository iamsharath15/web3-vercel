'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaCode } from 'react-icons/fa';

interface EmbedSectionProps {
  eventUrl: string;
}
const EmbedSection: React.FC<EmbedSectionProps> = ({ eventUrl }) => {
  const [embedType, setEmbedType] = useState<'button' | 'iframe'>('button');

  return (
    <>
      {/* Embed Event Section */}
      <section className="flex z-10 flex-col px-8 py-7 mt-8 w-full text-center rounded-xl border-b border-white bg-zinc-900 max-w-[1113px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full text-white max-md:max-w-full">
          <h2 className="my-auto text-xl font-medium">📋 Embed Event</h2>
        </div>
        <p className="self-start mt-3.5 text-sm text-stone-300">
          Have your own site? Embed the event to let visitors know about it.
        </p>
      </section>

      {/* Embed Options */}
      <div className="flex flex-col items-start px-8 pt-10 pb-8 w-full text-sm rounded-xl bg-neutral-900 max-w-[1113px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 w-full text-base font-semibold text-center">
          <Button
            className={`flex-1 ${embedType === 'button' ? 'bg-pink-500' : ''}`}
            onClick={() => setEmbedType('button')}
          >
            <FaCode className="w-5 h-5 mr-2" />
            Embed as Button
          </Button>
          <Button
            className={`flex-1 ${embedType === 'iframe' ? 'bg-pink-500' : ''}`}
            variant="secondary"
            onClick={() => setEmbedType('iframe')}
          >
            <FaCode className="w-5 h-5 mr-2" />
            Embed Event Page
          </Button>
        </div>

        {/* Code Snippet */}
        <p className="mt-8 text-center text-stone-300">
          Paste the following HTML code snippet to your page:
        </p>
        <pre className="self-stretch p-5 mt-4 text-white rounded-xl bg-zinc-950 max-md:max-w-full overflow-x-auto whitespace-pre-wrap break-words">
          {embedType === 'button'
            ? `<a href="http://localhost:3000/${eventUrl}" class="luma-checkout--button" data-luma-action="checkout" data-luma-event-id="evt-neCQ0LkNIJ0SGeM"> Register for Event</a>`
            : `<iframe src="${eventUrl}/simple" width="600" height="450" frameborder="0" style="border: 1px solid #bfcbda88; border-radius: 4px;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`}
        </pre>

        {/* Preview Section */}
        <p className="mt-8 text-center text-stone-300">This is what you will see:</p>
        <div className="flex flex-col justify-center items-center self-stretch px-16 py-10 mt-8 w-full text-base font-semibold text-center text-white rounded-xl bg-zinc-900 max-md:px-5 max-md:max-w-full">
          {embedType === 'button' ? (
            <a
              href={`http://localhost:3000/${eventUrl}`}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for Event
            </a>
          ) : (
            <iframe
              src={`http://localhost:3000/${eventUrl}`}
              width="600"
              height="450"
              frameBorder="0"
              className="border border-gray-500 rounded-lg"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Additional Info */}
        <p className="mt-8 text-stone-300 max-md:max-w-full">
          If you want to use your own styling for the button, simply remove the
          <code className="bg-gray-700 px-2 py-1 rounded"> luma-checkout--button </code> class from the snippet above.
          <br />
          <br />
          For advanced usage, check out our{' '}
          <a
            href="https://github.com/luma-team/examples"
            className="text-pink-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            example code and documentation
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default EmbedSection;
