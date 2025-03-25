'use client';
import AutoExpandTextarea from '@/components/shared/Create/AutoExpandTextarea';
import CategorySelect from '@/components/shared/Create/CategorySelect';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { StepBack, ArrowLeftFromLine, CircleArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DescriptionInput from '@/components/shared/Create/DescriptionInput';
import ThemeSelector from '@/components/shared/Create/ThemeSelector';
import ImageUpload from '@/components/shared/Create/ImageUpload';
import { parse } from 'date-fns';
import DateTimePicker from '@/components/shared/Create/DateTimePicker';
import VisibilityDropdown from '@/components/shared/Create/VisibilityDropdown';
import TicketSelector from '@/components/shared/Create/TicketSelector';
import ApprovalToggle from '@/components/shared/Create/ApprovalToggle';
import { CapacitySelector } from '@/components/shared/Create/CapacitySelector';
import { useRouter } from 'next/navigation';
interface CustomUser {
  access_token: string;
}

type FormValues = {
  name: string;
  category: string;
  description: string;
  theme: string;
  startDate: Date | null;
  startTime: string;
  endDate: Date | null;
  endTime: string;
  isPrivate: boolean;
  capacity: number;
  ticket: string;
  requiresApproval: boolean;
};

const EventForm: React.FC = () => {
  const { data: session } = useSession();
  const token = (session?.user as CustomUser)?.access_token;
  const { handleSubmit, register, setValue, watch, reset, control } =
    useForm<FormValues>({
      defaultValues: {
        name: 'Web3 Event',
        category: 'Culture',
        description: '',
        theme: 'Minimal',
        startDate: null,
        startTime: '',
        endDate: null,
        endTime: '',
        isPrivate: false,
        capacity: 100,
        ticket: 'free',
        requiresApproval: true,
      },
    });

  const [loading, setLoading] = useState(false);
  const eventName = watch('name', '');
  const category = watch('category', '');
  const description = watch('description', '');
  const theme = watch('theme', '');
  const [themeColor, setThemeColor] = useState<string>('#333');
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    register('name', { required: true, maxLength: 140 });
    register('category', { required: true });
    register('description', { required: true });
    register('theme', { required: true });
  }, [register]);
  const bgColor = useMemo(() => themeColor, [themeColor]);
  const handleImageUpload = (imageUrl: string) => {
    console.log('Uploaded image URL:', imageUrl);
    setImageUrl(imageUrl);

  };

  const formatDateTime = (date: Date | null, time: string) => {
    if (!date || !time) return '';

    const parsedTime = parse(time, 'hh:mm a', new Date());
    const formattedDate = new Date(date);
    formattedDate.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0);

    return formattedDate.toISOString();
  };

  const onSubmit = async (data: FormValues) => {
    const formattedStartTime = formatDateTime(data.startDate, data.startTime);
    const formattedEndTime = formatDateTime(data.endDate, data.endTime);

    console.log(formattedStartTime);
    console.log(formattedEndTime);
    if (!token) {
      toast.error('Unauthorized: No access token');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          bannerImage:
            imageUrl,
          status: 'UPCOMING',
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          timeZone: 'Asia/Kolkata',
          isOnline: false,
          venue: 'https://maps.app.goo.gl/vg1d5hyhDFFJFYdFA',
          registrationFee: 0.0,
        }),
      });
      const data1 = await response.json();
      if (!response.ok) throw new Error('Failed to create event');
      router.push(`/dashboard/events/${data1.event.data.id}/overview`);

      toast.success('Event created successfully! 🎉');
      reset();
    } catch (error) {
      toast.error('Event creation failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-500 min-h-screen w-full"
      style={{ background: bgColor }}
    >
      <div className="w-full flex items-center p-4">
        <Link href="/dashboard/events">
          <Button className="text-white bg-white/30 hover:text-black hover:bg-white text-sm md:text-lg font-semibold p-2">
            <CircleArrowLeft
              style={{ width: '25px', height: '25px' }}
              className="text-2xl w-8 h-8"
            />
          </Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-start w-full"
      >
        <div className="md:w-11/12 lg:w-9/12 w-10/12 flex justify-center items-start md:flex-row flex-col">
          <div className="md:w-5/12   w-full flex justify-center items-center flex-col p-[3%] gap-6">
            <ImageUpload onUpload={handleImageUpload} />
         

            <ThemeSelector
              onChange={(theme, color) => {
                setThemeColor(color);
                console.log('Selected:', theme, color);
                setValue('theme', theme);
              }}
            />
          </div>
          <div className="md:w-7/12 w-full flex flex-col p-[3%]">
            <div className="mt-4">
              <VisibilityDropdown control={control} name="isPrivate" />
            </div>

            {/* Event Name Input */}
            <div className="mt-4">
              <AutoExpandTextarea
                value={eventName}
                setValue={setValue}
                name="name"
                placeholder="Event Name"
                className="w-full  text-xl md:text-3xl font-semibold text-white placeholder-white"
              />
            </div>
            {/* Category Selection with Custom Option */}
            <div className="my-2">
              <CategorySelect
                value={category}
                setValue={setValue}
                name="category"
                options={['Culture', 'Technology', 'Business', 'Education']}
                className="w-full mt-4"
              />
            </div>
            <div className="my-2">
              <DescriptionInput
                value={description}
                setValue={setValue}
                name="description"
              />
            </div>

            <div className="flex flex-col p-[2%] my-2 rounded-md gap-1 bg-white/10">
              {/* Start Date & Time */}
              <div className="w-full flex">
                <div className="w-5/12 flex items-center justify-start">
                  {' '}
                  <h1 className="font-semibold text-white/40">Start</h1>
                </div>

                <div className="w-7/12 flex items-center justify-start">
                  {' '}
                  <DateTimePicker control={control} name="start" />
                </div>
              </div>
              {/* End Date & Time */}

              <div className="w-full flex">
                <div className="w-5/12 flex items-center justify-start">
                  {' '}
                  <h1 className="font-semibold text-white/40">End</h1>
                </div>

                <div className="w-7/12 flex items-center justify-start">
                  {' '}
                  <DateTimePicker control={control} name="end" />
                </div>
              </div>
            </div>
            <div className="my-2 ">
              <h1 className="text-white font-semibold my-1">Event Option</h1>
              <TicketSelector control={control} name="ticket" />
              <ApprovalToggle control={control} name="requiresApproval" />
              <CapacitySelector control={control} name="capacity" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="text-lg font-medium text-black bg-white hover:bg-white/60 rounded-lg w-full mt-4"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </div>
      </form>

      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default EventForm;
