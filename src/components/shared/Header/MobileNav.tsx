'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import NavButton from './NavButton';
import { useState } from 'react';
import NavItems from './NavItems';
interface HeaderLink {
  label: string;
  route: string;
}

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative block">
      <NavButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && (
        <div className="absolute top-0 -right-2 w-64 min-h-84 rounded-md bg-[#0A0A0A] p-10 z-10 flex flex-col">
          <NavItems />
          <div className="flex items-center justify-start mt-4">
            <Button asChild className="button rounded-lg">
              <Link className="" href="auth/signin">
                signin
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
