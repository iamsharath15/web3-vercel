'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  if (session) return null; // Hide Header if user is logged in

  return (
    <header className="w-full items-center justify-center flex py-6 absolute z-50">
      <div className="w-11/12 flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/image/NWEB4.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        <div className="items-center justify-center md:flex hidden">
          <NavItems />
          <div className="md:flex items-center justify-center hidden pl-4">
            <Button asChild className="button rounded-lg">
              <Link className="" href="/auth/signin">
                signin
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex w-32 justify-end  md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
