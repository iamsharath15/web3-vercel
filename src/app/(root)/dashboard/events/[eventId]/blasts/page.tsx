'use client';
import { useState } from "react";
import Image from 'next/image';
import { Mail, X, MessageSquare, Bell } from "lucide-react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ActionCard from "@/components/ui/ActionCard"; // Import the ActionCard component
import { toast } from "sonner";

type TabType = "All" | "Going" | "Pending" | "Waitlist";

interface SystemMessage {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const Blasts = () => {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [showSendOptions, setShowSendOptions] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const params = useParams();
  const eventId = params.eventId as string;
  const tabs: TabType[] = ["All", "Going", "Pending", "Waitlist"];

  const handleSendBlast = async (type: string) => {
    try {
      // Ensure all required fields are present
      if (!selectedRecipients.length || !message.trim()) {
        toast.error('Please select recipients and enter a message');
        return;
      }

      const payload = {
        recipients: selectedRecipients.map(r => r.toUpperCase()),
        message: message.trim(),
        type: type.toLowerCase()
      };
      console.log('Sending blast with payload:', payload);

      const response = await fetch(`/api/v1/events/${eventId}/admin/send-blast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send blast');
      }

      setMessage('');
      setShowSendOptions(false);
      setSelectedRecipients([]);
      toast.success('Blast sent successfully!');
    } catch (error) {
      console.error('Error sending blast:', error);
      toast.error('Failed to send blast. Please try again.');
    }
  };

  const toggleRecipient = (recipient: string) => {
    setSelectedRecipients(prev => 
      prev.includes(recipient)
        ? prev.filter(r => r !== recipient)
        : [...prev, recipient]
    );
  };

  return (
    <div className="min-h-screen bg-[#101010] text-foreground p-4 sm:p-6 animate-fade-in">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl text-white font-semibold">Blasts</h1>
      </header>
      <div className="mb-6">
        <div className="relative">
          <textarea
            placeholder="Blast Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#201A1D] backdrop-blur-sm rounded-xl p-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent min-h-[100px]"
          />
          <button
            onClick={() => message.trim() && setShowSendOptions(true)}
            className="absolute right-4 bottom-4 bg-[#C54B8C] text-white px-4 py-2 rounded-lg hover:bg-[#C54B8C]/80 transition-colors disabled:opacity-50"
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 text-white mb-6 sm:mb-8 border-b border-border/50 pb-2 overflow-x-auto scrollbar-none">
        {tabs.map((tab: TabType) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`nav-link whitespace-nowrap ${activeTab === tab && "active"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {systemMessages.map((item, index) => (
          <ActionCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            isSelected={false}
            onClick={() => setShowComingSoon(true)}
          />
        ))}
      </div>
      <div className="bg-[#303030] bg-opacity-50 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg text-white sm:text-xl font-semibold mb-6">Previous Messages</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#C54B8C] rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Messages Yet</h3>
          <p className="text-white text-sm sm:text-base">
            Start sending blasts to connect with your guests!
          </p>
        </div>
      </div>
      <Dialog open={showSendOptions} onOpenChange={setShowSendOptions}>
        <DialogContent className="bg-[#101010] border-none text-white">
          <DialogHeader>
            <DialogTitle>Send Via</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => toggleRecipient('GOING')}
                className={`px-3 py-1 rounded-full border ${
                  selectedRecipients.includes('GOING')
                    ? 'bg-[#C54B8C] border-[#C54B8C]'
                    : 'border-gray-600 hover:border-[#C54B8C]'
                } transition-colors`}
              >
                Going
              </button>
              <button
                onClick={() => toggleRecipient('PENDING')}
                className={`px-3 py-1 rounded-full border ${
                  selectedRecipients.includes('PENDING')
                    ? 'bg-[#C54B8C] border-[#C54B8C]'
                    : 'border-gray-600 hover:border-[#C54B8C]'
                } transition-colors`}
              >
                Pending
              </button>
            </div>
            
            <button 
              onClick={() => handleSendBlast('email')}
              className="w-full flex bg-[#303030] bg-opacity-50 items-center gap-3 p-3 rounded-lg hover:bg-[#303030] transition-colors"
              disabled={selectedRecipients.length === 0}
            >
              <Mail className="text-[#C54B8C]" />
              <span>Email</span>
            </button>
            <button 
              onClick={() => handleSendBlast('sms')}
              className="w-full flex bg-[#303030] bg-opacity-50 items-center gap-3 p-3 rounded-lg hover:bg-[#303030] transition-colors"
              disabled={selectedRecipients.length === 0}
            >
              <MessageSquare className="text-[#C54B8C]" />
              <span>SMS</span>
            </button>
            <button 
              onClick={() => handleSendBlast('push')}
              className="w-full flex bg-[#303030] bg-opacity-50 items-center gap-3 p-3 rounded-lg hover:bg-[#303030] transition-colors"
              disabled={selectedRecipients.length === 0}
            >
              <Bell className="text-[#C54B8C]" />
              <span>Push Notification</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
      <DialogContent className="bg-[#101010] border-none text-white [&>button]:text-white">
          <DialogHeader>
            <DialogTitle className="sr-only">Coming Soon</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-8 gap-6">
            <Image
              src="/assets/image/comingsoon.png"
              alt="logo"
              width={180}
              height={180}
            />
            <h1 className="text-2xl font-semibold text-white text-center">
              Coming Soon
            </h1>
            <p className="text-base text-white/80 text-center">
              Something exciting is on the way! Stay tuned for the latest updates,
              and be the first to know when we launch.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blasts;

const systemMessages: SystemMessage[] = [
  {
    title: "Event Reminders",
    icon: <MessageSquare className="w-5 h-5" />,
    description:
      "Reminders Are Sent Automatically Via Email, SMS, And Push Notification",
  },
  {
    title: "Post-Event Feedback",
    icon: <Bell className="w-5 h-5" />,
    description:
      "Schedule A Feedback Email To Go Out After The Event",
  },
];