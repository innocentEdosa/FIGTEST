import styles from './eventdescription.module.css'

const EventDescription = ({ description }: { description: string }) => {
  return <p className={styles.eventDescription}>{description}</p>
}

export default EventDescription
