'use client';

import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    iconPath: string;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className='py-[6%]'>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url; // Check if current URL matches

          return (
            <Link href={item.url} key={item.title}>
              <Collapsible
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`transition-all duration-200 h-10  ${
                        isActive
                          ? 'text-white bg-[#C54B8C]'
                          : 'text-[#42444a] hover:text-white hover:bg-[#d34c94b1]'
                      }`}
                    >
                      <Image
                        className={`transition-all duration-200 ${
                          isActive
                            ? 'invert brightness-0'
                            : 'group-hover/collapsible:filter group-hover/collapsible:invert group-hover/collapsible:brightness-0'
                        }`}
                        src={item.iconPath}
                        alt={item.title}
                        width={24}
                        height={24}
                      />{' '}
                      <span className='font-medium'>{item.title}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent></CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
