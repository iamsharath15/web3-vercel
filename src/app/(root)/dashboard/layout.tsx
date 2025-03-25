import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/shared/Sidebar/app.sidebar';
import { auth } from '@/lib/auth/authConfig';
import { redirect } from 'next/navigation';
import DashboardHeader from '@/components/shared/DashboardHeader/page';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex flex-col  bg-gradient-to-b  from-[#c54b8c]/10  bg-black to-bg-black ">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
