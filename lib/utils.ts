import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type EventItem = {
  image: string;
  title: string;
  slug: string;
  date: string;
  country: string;
  city: string;
  time: { from: string; to: string; };
}

export const events: EventItem[] = [
  {
    image: '/images/event1.png',
    title: 'Frontend Developers Meetup',
    slug: 'frontend-developers-meetup',
    date: '2025-01-18',
    country: 'Egypt',
    city: 'Alexandria',
    time: {
      from: '18:00',
      to: '21:00'
    }
  },
  {
    image: '/images/event2.png',
    title: 'Startup Pitch Night',
    slug: 'startup-pitch-night',
    date: '2025-01-22',
    country: 'Egypt',
    city: 'Cairo',
    time: {
      from: '17:30',
      to: '20:30'
    }
  },
  {
    image: '/images/event3.png',
    title: 'UI/UX Design Workshop',
    slug: 'ui-ux-design-workshop',
    date: '2025-01-27',
    country: 'UAE',
    city: 'Dubai',
    time: {
      from: '10:00',
      to: '15:00'
    }
  },
  {
    image: '/images/event4.png',
    title: 'Tech Career Fair',
    slug: 'tech-career-fair',
    date: '2025-02-02',
    country: 'Germany',
    city: 'Berlin',
    time: {
      from: '09:00',
      to: '16:00'
    }
  },
  {
    image: '/images/event5.png',
    title: 'JavaScript Conference',
    slug: 'javascript-conference',
    date: '2025-02-10',
    country: 'USA',
    city: 'San Francisco',
    time: {
      from: '08:30',
      to: '18:00'
    }
  },
  {
    image: '/images/event6.png',
    title: 'AI & Machine Learning Summit',
    slug: 'ai-machine-learning-summit',
    date: '2025-02-18',
    country: 'UK',
    city: 'London',
    time: {
      from: '11:00',
      to: '19:00'
    }
  }
];


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
