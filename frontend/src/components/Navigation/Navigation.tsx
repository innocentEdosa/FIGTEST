import clsx from 'clsx'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import routes from '../../utils/routes'
import styles from './navigation.module.css'

const Navigation = () => {

  const {  isAuthenticated,  } = useAppSelector(
    (state) => state.auth
  )

  return (
    <nav aria-label="Main navigation" className={clsx('container', styles.nav)}>
      <Link to={routes.home}>
        <h3 className={styles.logo}>
          Tech<span className={styles.logoAccent}>Events</span>UK
        </h3>
      </Link>
      <ul aria-label="Navigation List" className={styles.navList}>
        {!isAuthenticated && (
          <>
            {' '}
            <li className={styles.navItem}>
              <NavLink to={routes.login}>Log in</NavLink>{' '}
            </li>
            <li className={styles.navItem}>
              <NavLink to={routes.signup}>Sign up</NavLink>
            </li>
          </>
        )}
        {isAuthenticated &&  <li className={styles.navItem}>
              <NavLink to={routes.signup}>Your events</NavLink>
            </li>}
      </ul>
    </nav>
  )
}

export default Navigation
