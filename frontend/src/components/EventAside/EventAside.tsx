import { useMemo } from 'react'
import dateFormat from 'dateformat'
import styles from './eventaside.module.css'
import getColor from '../../utils/getColor'

const EventAside = ({
  date,
  isVirtual,
}: {
  date: string
  isVirtual: boolean
}) => {
  const eventBgColor = useMemo(() => getColor(), [])

  const dateObj = useMemo(() => {
    const day = dateFormat(date, 'dd')
    const month = dateFormat(date, 'mmm')
    const year = dateFormat(date, 'yyyy')
    return {
      day,
      month,
      year,
    }
  }, [date])

  return (
    <aside
      className={styles.eventCardAside}
      style={{ backgroundColor: eventBgColor }}
    >
      <span className={styles.eventCardDate}>
        <span className={styles.eventDay}>{dateObj.day}</span>
        <span className={styles.eventMonth}>
          {dateObj.month} {dateObj.year}
        </span>
      </span>
      {!isVirtual && (
        <span className={styles.eventCardType}>
          <span className={styles.eventText}>Onsite event</span>{' '}
        </span>
      )}
    </aside>
  )
}

export default EventAside
