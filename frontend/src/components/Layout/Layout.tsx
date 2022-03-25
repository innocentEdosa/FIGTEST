import Navigation from '../Navigation'
import styles from './layout.module.css'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layoutWrapper}>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>&#64;</span> 2022. by TechEventsUK
      </footer>
    </div>
  )
}

export default Layout
