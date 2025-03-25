import { Calendar, MessageSquare, Users, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaShareAlt,
  FaFacebookSquare,
  FaMailBulk,
} from 'react-icons/fa';
import { Copy, Facebook, Mail, Pencil, Twitter } from 'lucide-react';
import { FaSquareXTwitter } from 'react-icons/fa6';
interface HelpCard {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export const headerLinks = [
  {
    label: 'Explore',
    route: '/explore',
  },
  {
    label: 'Partners',
    route: '/partners',
  },
  {
    label: 'Pricing',
    route: '/pricing',
  },
];
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
}

export const pricingData: PricingPlan[] = [
  {
    id: 'free',
    name: 'Luma',
    price: 'Free',
    period: 'Forever',
    features: [
      'Unlimited number of events',
      'Unlimited number of guests per event',
      'Blasts and automated reminders via email, SMS, push notifications, and WhatsApp',
      'Send up to 500 invites or newsletters per week through Luma',
      'Check-in guests to your events through Luma',
      'Accept all credit cards, Apple Pay & Google Pay',
      'Accept regional payment methods such as iDEAL, Konbini, and PayNow',
      'Set up ticket types, group purchasing, and coupons',
      '5% platform fee for paid events',
      'Unlimited cohosts and event managers',
      'Up to 3 admins for your calendar',
      'Require approval or token gating for registration',
      'Import and export data via CSV',
      'Zoom integration with attendance tracking',
    ],
  },
  {
    id: 'plus',
    name: 'Luma Plus',
    price: '$29',
    period: 'per month',
    features: [
      '0% platform fee for paid events',
      'Send up to 5,000 invites and newsletters per week through Luma',
      'Ability to collect taxes for ticket sales',
      'Check-in manager role for your events',
      'Custom URL for event pages',
      'Up to 5 admins for your calendar',
      'Automate workflows with Zapier',
      'API access',
      'Priority support',
      'Expedited review for featured events',
      'Early access to select features',
    ],
  },
];

export type NavItem = {
  title: string;
  url: string;
  isActive?: boolean;
  iconPath: string;
};

export type SidebarData = {
  navMain: NavItem[];
};

export const sidebarData: SidebarData = {
  navMain: [
    {
      title: 'Events',
      url: '/dashboard/events',
      isActive: true,
      iconPath: '/assets/svg/events.svg',
    },
    {
      title: 'Discover',
      url: '/dashboard/discover',
      iconPath: '/assets/svg/explore.svg',
    },
    // {
    //   title: 'Calendar',
    //   url: '/dashboard/calendar',
    //   iconPath: '/assets/svg/calendar.svg',
    // },
    {
      title: 'Help',
      url: '/dashboard/help',
      iconPath: '/assets/svg/help.svg',
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      iconPath: '/assets/svg/settings.svg',
    },
  ],
};

export const helpCards: HelpCard[] = [
  {
    icon: Calendar,
    title: 'Event Registration Process',
    description:
      "What Happens When A Guest Registers For Your Event? Let's Walk Through The Flow.",
    link: '/help/event-registration',
  },
  {
    icon: MessageSquare,
    title: 'Collect Feedback From Your Event Guests',
    description:
      'Send A Feedback Email After Your Event To Collect Feedback On How The Event Went. Share Positive Feedback On Social Media.',
    link: '/help/feedback',
  },
  {
    icon: Users,
    title: 'Managing Guest Lists',
    description:
      "Learn How To Effectively Manage Your Event's Guest List, Including RSVPs, Waitlists, And VIP Guests.",
    link: '/help/guest-management',
  },
  {
    icon: Settings,
    title: 'Event Settings & Configuration',
    description:
      'Configure Your Event Settings, Including Notifications, Privacy Options, And Custom Branding.',
    link: '/help/settings',
  },
];

export const socialPlatforms = [
  {
    name: 'Facebook',
    url: (link: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${link}`,
    icon: FaFacebookSquare,
  },
  {
    name: 'Tweet',
    url: (link: string) => `https://twitter.com/intent/tweet?url=${link}`,
    icon: FaSquareXTwitter,
  },
  {
    name: 'Post',
    url: (link: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
    icon: FaLinkedin,
  },
  {
    name: 'Email',
    url: (link: string) => `mailto:?subject=Check out this event!&body=${link}`,
    icon: FaEnvelope,
  },
];
