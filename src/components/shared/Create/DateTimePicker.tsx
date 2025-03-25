'use client';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { format, parse } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Generate time slots (every 30 min)
const generateTimeSlots = () => {
  const slots = [];
  let start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < 48; i++) {
    slots.push(format(start, 'hh:mm a'));
    start.setMinutes(start.getMinutes() + 30);
  }
  return slots;
};

const timeSlots = generateTimeSlots();
interface DateTimePickerProps {
  control: Control<any>;
  name: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ control, name }) => {
  return (
    <div className="flex w-full items-center">
      {/* Date Picker */}
      <div className="w-7/12">
        <Controller
          control={control}
          name={`${name}Date`}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center w-full p-2 border-0 bg-white/20 text-white  rounded-l-lg gap-2">
                  {field.value
                    ? format(field.value, 'EEE, dd MMM')
                    : format(new Date(), 'EEE, dd MMM')}
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className='w-full border-0 bg-[#1c1e21]/90 text-white'>
                <Calendar className='w-full '
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      {/* Time Picker */}
      <div className="w-5/12 ml-[2px]">
        <Controller
          control={control}
          name={`${name}Time`}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-white/20 placeholder:text-white data-[placeholder]:text-white text-white  rounded-none !rounded-r-lg border-0">
                <SelectValue className=''
                  placeholder={field.value ? field.value  : format(new Date(), 'hh:mm a')} // Default to current time
                />
              </SelectTrigger>
              <SelectContent className='bg-[#1c1e21]/90 text-white border-0'>
                {timeSlots.map((time) => (
                  <SelectItem className='' key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
