'use client';

import { useState } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Box, Check, Plus } from 'lucide-react';
import { UseFormSetValue } from 'react-hook-form';

interface CategorySelectProps {
  value: string;
  setValue: UseFormSetValue<any>;
  name: string;
  options: string[];
  className?: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  setValue,
  name,
  options,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(options);
  const [inputValue, setInputValue] = useState(value || '');

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    setValue(name, selectedValue);
    setOpen(false);
  };

  const handleAddCustomCategory = () => {
    if (inputValue && !categories.includes(inputValue)) {
      setCategories([...categories, inputValue]);
    }
    handleSelect(inputValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start bg-white/10 hover:bg-white/40 font-semibold text-[16px] text-white/40 border-0 ',
            className
          )}
        >
          {' '}
          <Box />
          {inputValue || 'Add category'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-2">
        <Command>
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            placeholder="Type or select a category..."
            className="text-black"
          />
          <CommandList>
            {categories.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => handleSelect(option)}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    inputValue === option ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option}
              </CommandItem>
            ))}

            {inputValue && !categories.includes(inputValue) && (
              <CommandItem
                className="cursor-pointer flex items-center text-blue-600"
                onSelect={handleAddCustomCategory}
              >
                <Plus className="mr-2 h-4 w-4" /> Add "{inputValue}"
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelect;
