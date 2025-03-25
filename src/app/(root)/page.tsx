import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="w-full bg-black">
      <div className="flex md:flex-row flex-col md:h-screen h-full relative">
        <div className="md:w-5/12 w-full flex md:items-start items-center flex-col justify-center md:pt-20 pt-20 md:pb-[2%] pb-[10%] px-10 md:pl-10 z-20">
          <h1 className="text-white md:text-left text-center pb-3 text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold">
            Your Event, Your Way!
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#C54B8C] to-[#B284BE]">
              Create, Share & Sell
            </span>
            <br />
            Seamlessly 🚀
          </h1>
          <p className="text-white md:text-left text-center pb-4 sm:px-[0%] px-[6%]">
            Create and share events effortlessly. Invite friends, sell tickets,
            and make every event unforgettable.
          </p>
          <Link href={"/auth/signin"}>
            <Button className="rounded-full button">Get started</Button>
          </Link>
          
        </div>
        <div className="md:w-7/12 flex items-center justify-center w-full z-10">
          <Image
            src="/assets/image/landing-image.png"
            alt="Landing Page Image"
            width={1920}
            height={1080}
          />
        </div>
        <div className="landingPageSvg absolute lg:w-8/12 md:w-10/12 w-full h-full right-0 z-0"></div>
      </div>
    </section>
  );
}
