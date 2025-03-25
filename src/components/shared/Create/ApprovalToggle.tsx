'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UserCheck } from 'lucide-react';

interface ApprovalToggleProps {
  control: Control<any>;
  name: string;
}

const ApprovalToggle: React.FC<ApprovalToggleProps> = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex justify-between items-center bg-white/10  text-white px-4 py-3 rounded-lg my-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-white/40" />
            <Label className="text-gray-300 text-[16px] font-semibold">Require Approval</Label>
          </div>
          <Switch
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
          />
        </div>
      )}
    />
  );
};

export default ApprovalToggle;
