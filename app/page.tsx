import ExploreButton from '@/components/ExploreButton'
import EventCard from '@/components/EventCard'; 
import { events } from '@/lib/utils';
import EventItem from '@/lib/utils';

export default function page() {
  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br /> Event you Can't Miss</h1>
      <p className='text-center'>Hackathons, meetups, conferences, and more!</p>
      <ExploreButton />
      <div className='mt-10'>
        <h3 className='mb-5'>Featured Events</h3>
        <ul className='events'>
          {events.map((event: EventItem) => (
            <li key={event.title} className='list-none'>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

