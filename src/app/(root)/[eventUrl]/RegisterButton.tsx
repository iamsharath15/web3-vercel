"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

interface CustomSessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  access_token: string; // Ensure access_token exists
}

interface CustomSession {
  user: CustomSessionUser;
}
interface RegisterButtonProps {
  eventId: string;
}
const RegisterButton: React.FC<RegisterButtonProps> = ({ eventId }) => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const { data: session } = useSession() as { data: CustomSession | null };

  const handleRegister = async () => {
    setRegistering(true);
    setMessage(null);

    if (!session?.user?.access_token || !eventId) {
      setMessage("Authentication required. Please log in.");
      setRegistering(false);
      return;
    }

    try {
      const response = await fetch(`/api/events/register`, {
        method: "POST",
        body: JSON.stringify({
          eventId: eventId,
          customFields: [],
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Registration failed");

      setMessage("Successfully registered for the event!");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white/20 rounded-lg">
      <div className="flex items-center justify-start w-full bg-[#464646] rounded-t-lg px-4 py-2">
        <h1>Registration</h1>
      </div>
      <div className="flex flex-col items-start justify-center w-full p-4">
        <h1 className="text-left pb-4">Welcome! To join the vent, please register below</h1>
        <button
        onClick={handleRegister}
        disabled={registering}
        className="px-6 py-2 bg-white text-black rounded-lg disabled:bg-gray-400 w-full"
      >
        {registering ? "Registering..." : "Request to join"}
      </button>
      {message && <p className="mt-2 text-center text-red-500">{message}</p>}
      </div>
      
    
    </div>
  );
};

export default RegisterButton;
