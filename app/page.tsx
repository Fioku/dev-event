import ExploreButton from '@/components/ExploreButton'
import EventCard from '@/components/EventCard'; 
import { IEvent } from '@/models/Event';

const BASE_URL = process.env.PUBLIC_NEXT_URL;

const Page = async () => {
  const eventsData = await fetch(`${BASE_URL}/api/event`);
  const eventsObj = await eventsData.json();
  const events: IEvent[] = eventsObj.events;
  // console.log(events.map((event: IEvent) => event.title));

  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br /> Event you Can't Miss</h1>
      <p className='text-center'>Hackathons, meetups, conferences, and more!</p>
      <ExploreButton />
      <div className='mt-10'>
        <h3 className='mb-5'>Featured Events</h3>
        <ul className='events'>
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title} className='list-none'>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page;