import styles from './infocard.module.css'

const InfoCard = ({ text }: { text: string }) => {
  return <div className={styles.infoCard}>{text}</div>
}

export default InfoCard
