import { Link } from 'react-router-dom'
import EventAside from '../EventAside'
import EventCategory from '../EventCategory'
import EventDescription from '../EventDescription'
import EventTitle from '../EventTitle'

// I would normally put this in a type folder.
export type EventType = {
  _id: string
  title: string
  description: string
  address: string
  isVirtual: boolean
  date: string
  category: {
    title: string
  }
}

const EventCard = ({
  title,
  description,
  date,
  category,
  isVirtual,
  _id,
}: EventType) => {
  return (
    <Link to={`/events/${_id}`}>
      <article>
        <EventAside date={date} isVirtual={isVirtual} />
        <EventCategory category={category.title} />
        <EventTitle title={title} />
        <EventDescription description={description} />
      </article>
    </Link>
  )
}

export default EventCard
