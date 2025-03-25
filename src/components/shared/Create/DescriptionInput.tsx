'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { UseFormSetValue } from 'react-hook-form';

interface DescriptionInputProps {
  value: string;
  setValue: UseFormSetValue<any>;
  name: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  setValue,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const handleSave = () => {
    setValue(name, tempValue);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full overflow-hidden flex justify-start items-center font-semibold text-[16px] text-white/40 bg-white/10 hover:bg-white-40 border-0 px-4 py-2 rounded-md"
        >
          <Pencil className="h-5 w-5 opacity-60" /> {value || 'Add Description'}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-6/12  bg-[#1c1e21]/90 border-0 text-[#d1d1d2] ">
        <DialogHeader className="text-lg font-semibold">
          <DialogTitle className=''>Add Description</DialogTitle>
        </DialogHeader>
        <Textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder="Enter event description..."
          className="w-full min-h-[120px] resize-none bg-[#1c1e21] text-white"
        />
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-white text-black hover:text-white hover:bg-[#717171]"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionInput;
