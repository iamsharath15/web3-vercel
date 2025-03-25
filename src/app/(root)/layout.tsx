import { auth } from '@/lib/auth/authConfig';
import Header from '@/components/shared/Header/page';
import { SessionProvider } from 'next-auth/react';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col bg-black h-full">
        <Header /> {/* Always render header, let it decide whether to show */}
        <main className="flex flex-col">{children}</main>
      </div>
    </SessionProvider>
  );
}
