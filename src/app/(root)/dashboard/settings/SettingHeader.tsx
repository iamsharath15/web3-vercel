'use client';

import React from 'react';
import { Settings2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SettingsHeader() {
  const pathname = usePathname();

  const isLinkActive = (path: string) => pathname?.includes(path);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 py-6">
            <Settings2 className="h-6 w-6" />
            <h1 className="text-xl font-medium">Settings</h1>
          </div>
          
          <div className="flex gap-8 -mb-px">
            <Link
              href="/dashboard/settings/account"
              className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                isLinkActive('account')
                  ? 'border-pink-600 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Account
            </Link>
            <Link
              href="/dashboard/settings/preferences"
              className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                isLinkActive('preferences')
                  ? 'border-pink-600 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Preferences
            </Link>
            <Link
              href="/dashboard/settings/payment"
              className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                isLinkActive('payment')
                  ? 'border-pink-600 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Payment
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Content will be rendered by Next.js page router */}
      </div>
    </div>
  );
}

export default SettingsHeader;