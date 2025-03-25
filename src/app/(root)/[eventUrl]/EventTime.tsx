import { format, isSameDay } from 'date-fns';

interface EventTimeProps {
  startTime: string;
  endTime: string;
  timeZone: string;
}

const EventTime: React.FC<EventTimeProps> = ({
  startTime,
  endTime,
  timeZone,
}) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const isSameDayEvent = isSameDay(start, end);
  const formattedStartDate = format(start, 'EEEE d MMMM'); // Example: Thursday 20 March
  const formattedStartUiDate = format(start, 'd'); // Example: Thursday 20 March
  const formattedStartUiMonth = format(start, 'MMM'); // Example: Thursday 20 March

  const formattedStartTime = format(start, 'h:mm a'); // 9:00 am
  const formattedEndTime = format(end, 'h:mm a'); // 10:30 pm
  const formattedEndDate = format(end, 'd MMM'); // Example: 21 Mar

  const timeDisplay = isSameDayEvent
    ? `${formattedStartTime} - ${formattedEndTime}`
    : `${formattedStartTime} - ${formattedEndDate}, ${formattedEndTime}`;

  return (
    <div className="text-white py-4 rounded-md flex ">
      <div className="w-10  border-[1px] border-white/60 rounded-lg bg-white/10">
        <div className="flex w-full items-center justify-center flex-col ">
          <div className="bg-white/30 w-full items-center justify-center flex">
            {formattedStartUiMonth}
          </div>
          <div className="">{formattedStartUiDate}</div>
        </div>
      </div>
      <div className='flex flex-col ml-4'>
      <div className="text-lg font-bold">{formattedStartDate}</div>
      <div className="text-sm">{timeDisplay}</div>
      </div>
    </div>
  );
};

export default EventTime;
