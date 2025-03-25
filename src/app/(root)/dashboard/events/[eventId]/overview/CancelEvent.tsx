'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FaTimes } from 'react-icons/fa';

interface CancelEventProps {
  eventId: string;
}

const CancelEvent: React.FC<CancelEventProps> = ({ eventId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // State for dialog

  const handleCancelEvent = async () => {
    if (!eventId) {
      setError('Missing event ID.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/events/cancel/${eventId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to cancel event');

      setOpen(false); // Close dialog on success
      router.push('/dashboard/events'); // Redirect after cancellation
    } catch (err) {
      setError('Error canceling event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:p-[4%] p-[8%] my-[4%] rounded-xl bg-[#171717] w-full">
      <h2 className="lg:text-2xl md:text-xl text-lg font-medium text-white">
        ⚠️ Cancel Event
      </h2>
      <p className="lg:text-l/6 md:text-base/6 py-[2%] text-sm/5 text-[#D4C2CB]">
        Cancel and permanently delete this event. This operation cannot be undone.
        If there are any registered guests, we will notify them that the event has been canceled.
      </p>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex items-center justify-center">
        <Button
          className="lg:text-lg md:text-base text-sm my-[2%] flex font-medium items-center bg-[#BB0003] hover:bg-[#bb0003d1] px-4 rounded-md"
          onClick={() => setOpen(true)} // Open the confirmation dialog
        >
          <FaTimes className="w-4 h-4 mr-2" />
          Cancel Event
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#18181b] text-white border-none">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action is irreversible. You will lose all event details and registrations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              No, Keep Event
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelEvent}
              disabled={loading}
            >
              {loading ? 'Cancelling...' : 'Yes, Cancel Event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CancelEvent;
