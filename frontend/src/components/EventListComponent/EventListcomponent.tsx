import clsx from 'clsx'
import EventCard, { EventType } from '../EventCard'
import styles from './eventlistcomponent.module.css'

const EventListComponent = ({ events }: { events: EventType[] }) => {
  return (
    <ul className={clsx('grid', styles.eventList)}>
      {events.map((event: EventType) => (
        <li key={event._id} className={styles.eventListItem}>
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  )
}

export default EventListComponent
