'use client';

import * as React from 'react';
import { sidebarData } from '@/constants/index';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { NavMain } from './nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu className='py-[2%]'
        >
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent  data-[state=open]:text-white"
            >
              <Image
                src="/assets/image/NWEB4.png"
                width={60}
                height={60}
                alt="logo"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>{' '}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
