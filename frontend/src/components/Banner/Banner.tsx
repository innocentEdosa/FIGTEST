import clsx from 'clsx'
import styles from './banner.module.css'
import EventSearchForm from '../EventSearchForm'

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={clsx('', 'container', styles.bannerContainer)}>
        <aside className={styles.bannerAside}>
          <h3 className={styles.bannerLead}>It only takes an event</h3>
          <EventSearchForm />
        </aside>
      </div>
    </section>
  )
}

export default Banner
