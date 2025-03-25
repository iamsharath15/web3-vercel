'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Ticket, UserCheck } from 'lucide-react';

interface CapacitySelectorProps {
  control: any;
  name: string;
}

export const CapacitySelector: React.FC<CapacitySelectorProps> = ({
  control,
  name,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
          <div className='flex gap-2'>
          <UserCheck className="w-5 h-5 text-white/40" />
          <span className="text-gray-300 font-semibold tetx-[16px]">Capacity</span>
         </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="text-gray-300 flex items-center space-x-2">
                <span>{field.value || 'Unlimited'}</span>
                <Ticket className="w-5 h-5 text-gray-400" />
              </button>
            </DialogTrigger>
            <DialogContent className='bg-[#1c1e21]/90 text-white border-none'>
              <DialogHeader>
                <DialogTitle>Max Capacity</DialogTitle>
                <p className="text-gray-500 text-sm">
                  Auto-close registration when capacity is reached. Only
                  approved guests count towards the cap.
                </p>
              </DialogHeader>
              <div className="space-y-3">
                <Input className='text-black'
                  type="number"
                  value={field.value === 'Unlimited' ? '' : field.value}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : 100
                    )
                  }
                  placeholder="Enter capacity"
                />
                <div className="flex justify-between">
                  <Button onClick={() => setOpen(false)}>Set Limit</Button>
                  <Button
                    variant="secondary"
                    onClick={() => field.onChange(100)}
                  >
                    Remove Limit
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    />
  );
};
