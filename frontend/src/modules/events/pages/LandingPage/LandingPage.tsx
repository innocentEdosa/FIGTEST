import clsx from 'clsx'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { getEvents } from '../../service/slice'
import Layout from '../../../../components/Layout'
import Banner from '../../../../components/Banner'
import Button from '../../../../components/Button'
import InfoCard from '../../../../components/InfoCard'
import routes from '../../../../utils/routes'
import styles from './landingPage.module.css'
import EventListComponent from '../../../../components/EventListComponent'

const EventList = () => {
  const navigate = useNavigate()

  const [pageState] = useState({
    page: 1,
    perPage: 10,
  })

  const { isGettingEvents, isError, isSuccess, events } = useAppSelector(
    (state) => state.event
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEvents(pageState))
  }, [dispatch, pageState])

  const navigateToMoreEventsPage = useCallback(
    () => navigate({ pathname: routes.events }),
    [navigate]
  )

  const renderEvents = () => {
    if (!isGettingEvents && isSuccess && !!events.events.length)
      return <EventListComponent events={events.events} />
    if (isError) {
      return <InfoCard text=":sorry we ran into some errors" />
    }
    if (!isGettingEvents && !!events.events.length) {
      return <InfoCard text="We current do not have events at this time" />
    }
  }

  const renderSeeMoreBtn = () => {
    if (events.eventMetaData.total > pageState.perPage && !isGettingEvents)
      return (
        <div className={styles.moreBtn}>
          <Button onClick={navigateToMoreEventsPage}>See more events</Button>
        </div>
      )
  }

  return (
    <Layout>
      <Banner />
      <section className={clsx('container', styles.eventListSection)}>
        {isGettingEvents && <InfoCard text="Loading Events..." />}
        {renderEvents()}
        {renderSeeMoreBtn()}
      </section>
    </Layout>
  )
}

export default EventList
