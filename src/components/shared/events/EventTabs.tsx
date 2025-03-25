import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EventTabs({ eventId }: { eventId: string }) {
  const pathname = usePathname();

  const tabs = [
    { name: "Overview", href: `/dashboard/events/${eventId}` },
    { name: "Guests", href: `/dashboard/events/${eventId}/guests` },
    { name: "Registration", href: `/dashboard/events/${eventId}/registration` },
    { name: "Blasts", href: `/dashboard/events/${eventId}/blasts` },
  ];

  return (
    <div className="border-b border-[#C54B8C] mb-8 w-full items-center flex justify-center">
      <div className="flex w-11/12 gap-6">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);

          return (
            <div key={tab.name} className="flex flex-col items-center">
              <Link
                href={tab.href}
                className={`text-lg font-medium pb-2 ${
                  isActive ? "text-white font-semibold" : "text-gray-500"
                } transition-colors`}
              >
                {tab.name}
              </Link>
              <div
                className={`w-full h-[3px] bg-[#C54B8C] rounded-md transition-all ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
