import Link from "next/link";
import Image from "next/image";
import EventItem from '@/lib/utils';

const EventCard = ({ image, title, city, country, slug, time, date }: EventItem) => {
  return (
    <Link href={`/events/${slug}`} className="event-card">
        <Image src={image} alt={title} width={410} height={300} className="poster" />
        <div className="flex gap-2">
            <Image src="/icons/pin.svg" alt="pin-icon" width={14} height={14} className="pin-icon" />
            <p className="text-gray-400">{city}, {country}</p>
        </div>
        <p className="text-lg font-semibold">{title}</p>
        <div className='flex gap-2 items-center'>
            <Image src="/icons/calendar.svg" alt="calendar-icon" width={14} height={14} className="calendar-icon" />
            <p className="text-gray-400">{date} | {time.from} - {time.to}</p>
        </div>
    </Link>
  )
}

export default EventCard