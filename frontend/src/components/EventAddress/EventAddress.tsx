import styles from './eventaddress.module.css'

const EventAddress = ({ address }: { address: string }) => {
  return <p className={styles.eventAddress}>{address}</p>
}

export default EventAddress
