import styles from './eventcategory.module.css'

const EventCategory = ({ category }: { category: string }) => {
  return (
    <div>
      <span className={styles.eventCategory}>#{category}</span>
    </div>
  )
}

export default EventCategory
