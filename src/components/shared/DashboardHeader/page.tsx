import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { SignOutButton } from '@/components/shared/SignOutButton';
import { auth } from '@/lib/auth/authConfig';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Plus, Search, Bell } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';


interface SessionUser {
  name?: string;
  email?: string;
}

interface Session {
  user?: {
    userData?: SessionUser;
    image?: string; // Updated to include image
  };
}

type ProfileAvatarProps = {
  name?: string;
  image?: string;
};


const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name = 'User', image }) => {
  return (
    <div className="flex items-center justify-center md:w-7 md:h-7 w-5 h-5 rounded-full bg-blue-500 text-white text-xl font-bold overflow-hidden">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </div>
  );
};

const DashboardHeader = async () => {
  const session = await auth();
  const today: Date = new Date();
  const user = (session as Session)?.user?.userData || {};
  const image = (session as Session)?.user?.image || ''; // Get image from session

  return (
    <header className="flex h-16 items-center gap-2 transition-[width,height] ease-linear ">
      <div className="flex items-center px-4 w-full justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className=" h-4 bg-[#c54b8c]" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <h1 className="text-white text-[14px] md:text-[16px] lg:text-[20px] font-semibold">
                  Welcome Back,
                  <span className="text-[#C54B8C]">{user.name || 'User'}</span>
                </h1>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="items-center justify-center md:flex hidden">
          <p className="text-white text-[10px] md:text-[12px] lg:text-[18px] font-medium ">
            {format(today, 'EEEE')}, {format(today, 'd MMM')}{' '}
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 pr-[5%]">
          <Button className="rounded-lg flex items-center  bg-[#343436] hover:bg-white text-white hover:text-[#343436] text-[12px] lg:text-[18px] px-[5%] py-[2%] h-auto font-medium justify-center">
            <Link
              href="/create"
              className="flex md:gap-3 gap-2 items-center justify-center"
            >
              Create Event
              <Plus className="md:!w-[20px] md:!h-[20px] !w-[12px] h-[12px] " />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell className="hover:text-white text-[#41444A] md:w-6 w-5 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1e1f1f] border-0  w-64">
              <ScrollArea className=" rounded-md border-0 p-2 text-white flex items-center justify-center">
                No Notification
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <ProfileAvatar name={user.name} image={image} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1e1f1f] border-0 p-2">
              <DropdownMenuLabel className="flex items-center justify-center px-2">
                <ProfileAvatar name={user.name} image={image} />
                <div className="pl-4">
                  <h1 className="text-white">{user.name}</h1>
                  <h1 className="text-white">{user.email}</h1>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#2e2f2f] px-2" />
              <DropdownMenuItem className="text-white focus:text-white focus:bg-[#2e2f2f]">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white focus:text-white focus:bg-[#2e2f2f]">
                Subscription
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white focus:text-white focus:bg-[#2e2f2f]">
                <SignOutButton className="text-white focus:text-white focus:bg-[#2e2f2f] w-full text-left" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
