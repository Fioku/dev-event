import Link from "next/link";
import Image from "next/image";

const EventCard = (props: {
  slug: string;
  image: string;
  title: string;
  venue: string;
  date: string;
  startingTime: string;
  endingTime: string;
}) => {
  return (
    <Link href={`/events/${props.slug}`} className="event-card">
        <Image src={props.image} alt={props.title} width={410} height={300} className="poster" />
        <div className="flex gap-2">
            <Image src="/icons/pin.svg" alt="pin-icon" width={14} height={14} className="pin-icon" />
            <p className="text-gray-400">{props.venue}</p>
        </div>
        <p className="text-lg font-semibold">{props.title}</p>
        <div className='flex gap-2 items-center'>
            <Image src="/icons/calendar.svg" alt="calendar-icon" width={14} height={14} className="calendar-icon" />
            <p className="text-gray-400">{props.date} | {props.startingTime} - {props.endingTime}</p>
        </div>
    </Link>
  )
}

export default EventCard