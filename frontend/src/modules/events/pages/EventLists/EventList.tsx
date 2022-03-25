import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { getEvents } from '../../service/slice'
import Layout from '../../../../components/Layout'
import InfoCard from '../../../../components/InfoCard'
import EventListComponent from '../../../../components/EventListComponent'
import styles from './eventlist.module.css'
import { useSearchParams } from 'react-router-dom'

const EventList = () => {
  const [searchParams] = useSearchParams()

  const [pageState] = useState({
    page: searchParams.get('page') || 1,
    perPage: 30,
    search: searchParams.get('search') || '',
  })

  const { isGettingEvents, isError, isSuccess, events } = useAppSelector(
    (state) => state.event
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEvents(pageState))
  }, [dispatch, pageState])

  const renderEvents = () => {
    if (!isGettingEvents && isSuccess && !!events.events.length)
      return <EventListComponent events={events.events} />
    if (isError) {
      return <InfoCard text=":sorry we ran into some errors" />
    }
    if (!isGettingEvents && !events.events.length) {
      const info = pageState.search
        ? 'No event matches your search'
        : 'We current do not have events at this time'
      return <InfoCard text={info} />
    }
  }

  return (
    <Layout>
      <section className={clsx('container', styles.eventsSection)}>
        {isGettingEvents && <InfoCard text="Loading Events..." />}
        {renderEvents()}
      </section>
    </Layout>
  )
}

export default EventList
