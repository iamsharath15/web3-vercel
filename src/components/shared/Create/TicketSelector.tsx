'use client';

import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Ticket, Pencil, Check, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface TicketSelectorProps {
  control: Control<any>;
  name: string;
}

const options = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
];

const TicketSelector: React.FC<TicketSelectorProps> = ({ control, name }) => {
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="flex justify-between w-full my-2 bg-white/10 hover:bg-white/30 text-gray-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-[16px]">Tickets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{field.value === 'paid' ? 'Paid' : 'Free'}</span>
                  <Pencil className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-[#1c1e21]/90 text-white p-4 border-0 rounded-lg">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#3b3d41]/80 cursor-pointer"
                  onClick={() => {
                    if (option.value === 'paid') {
                      setShowDialog(true);
                    } else {
                      field.onChange(option.value);
                      setOpen(false);
                    }
                  }}
                >
                  <span>{option.label}</span>
                  {field.value === option.value && (
                    <Check className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        )}
      />

      {/* Paid Feature Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#1c1e21]/90 text-white border-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              Paid Feature Unavailable
            </DialogTitle>
            <DialogDescription className='text-white'>
              This feature is not available at the moment. Please use Free
              tickets instead.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className='bg-white text-black hover:text-white hover:bg-[#717171]' onClick={() => setShowDialog(false)}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketSelector;
