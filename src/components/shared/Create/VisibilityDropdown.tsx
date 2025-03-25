'use client';

import { Control, Controller } from 'react-hook-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, Sparkles, Check, ChevronDown } from 'lucide-react';

const options = [
  {
    label: 'Public',
    value: true,
    description: 'Visible on calendar.',
    icon: <Globe className="w-4 h-4 text-white/50" />,
  },
  {
    label: 'Private',
    value: false,
    description: 'Only people with the link can register.',
    icon: <Sparkles className="w-4 h-4 text-white/50" />,
  },
];
interface VisibilityDropdownProps {
  control: Control<any>;
  name: string;
}
const VisibilityDropdown: React.FC<VisibilityDropdownProps> = ({
  control,
  name,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex  py-1.5 items-center gap-2 font-semibold text-[14px] text-white/40 px-2.5  bg-white/10 border-0 focus-visible:border-0 hover:bg-white/60 h-auto"
            >
              {options.find((opt) => opt.value === field.value)?.icon}
              {options.find((opt) => opt.value === field.value)?.label}
              <ChevronDown className="text-white/40" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 border-0  bg-[#1c1e21]/90 text-white  shadow-lg rounded-lg p-2 gap-2">
            {options.map((option) => (
              <DropdownMenuItem
                key={option.label}
                onClick={() => field.onChange(option.value)}
                className="flex gap-2 p-3  hover:bg-[#3b3d41]/80 focus:bg-[#3b3d41]/80 items-center cursor-pointer rounded-lg"
              >
                {option.icon}
                <div className="flex-1">
                  <p className="text-sm font-medium text-white hover:text-white">{option.label}</p>
                  <p className="text-xs text-gray-400">{option.description}</p>
                </div>
                {field.value === option.value && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
};

export default VisibilityDropdown;
