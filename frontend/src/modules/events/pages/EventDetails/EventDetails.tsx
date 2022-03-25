import clsx from 'clsx'
import { useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { getEvent } from '../../service/slice'
import Layout from '../../../../components/Layout'
import EventAside from '../../../../components/EventAside'
import EventTitle from '../../../../components/EventTitle'
import EventAddress from '../../../../components/EventAddress'
import EventCategory from '../../../../components/EventCategory'
import Button from '../../../../components/Button'
import styles from './eventdetails.module.css'
import InfoCard from '../../../../components/InfoCard'
import EventDescription from '../../../../components/EventDescription'
import routes from '../../../../utils/routes'

const Event = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()

  const { isGettingSingleEvent, activeEvent } = useAppSelector(
    (state) => state.event
  )

  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  console.log(user, isAuthenticated)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (eventId) {
      dispatch(getEvent(eventId))
    }
  }, [dispatch, eventId])

  const addToUserEvent = useCallback(() => {
    if (!isAuthenticated) {
      navigate(routes.login)
    } else {
      // add events to user
      alert('at this point we would add this events to your account: tada')
    }
  }, [])

  const renderCorrectEventView = () => {
    if (isGettingSingleEvent) {
      return <InfoCard text="Loading Event..." />
    }

    if (!isGettingSingleEvent && !activeEvent) {
      return <InfoCard text="Sorry. I did not find this event" />
    }

    if (activeEvent) {
      return (
        <>
          <EventCategory category={activeEvent.category.title} />
          <EventTitle title={activeEvent.title} />
          <EventAddress address={activeEvent.address} />
          <div className={styles.asideWrapper}>
            <EventAside
              date={activeEvent.date}
              isVirtual={activeEvent.isVirtual}
            />
          </div>
          <EventDescription description={activeEvent.description} />
          <div className={styles.btnWrapper}>
            <Button onClick={addToUserEvent}>
              Attending?. Add to your events
            </Button>
          </div>
        </>
      )
    }
  }

  return (
    <Layout>
      <section className={clsx('container', styles.eventWrapper)}>
        {renderCorrectEventView()}
      </section>
    </Layout>
  )
}

export default Event
