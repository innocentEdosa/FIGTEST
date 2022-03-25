import styles from './eventtitle.module.css'

const EventTitle = ({ title }: { title: string }) => {
  return <h3 className={styles.eventTitle}>{title}</h3>
}

export default EventTitle
