'use client';
import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderLink {
  label: string;
  route: string;
}

const NavItems: React.FC = () => {
  const pathname = usePathname();

  return (
    <ul className="flex w-full flex-col items-start sm:gap-8 gap-4 md:flex-row ">
      {headerLinks.map((link: HeaderLink) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            className="navbar-logo-links"
            href={link.route}
          >
            <li className="sm:static relative text-2xl sm:text-base font-bold text-white">
              {link.label}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default NavItems;
