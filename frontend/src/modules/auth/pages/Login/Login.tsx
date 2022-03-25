import { useState, FormEventHandler, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../../../utils/routes'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { login } from '../../service/slice'
import TextField from '../../../../components/Input/TextField'
import styles from './login.module.css'
import Button from '../../../../components/Button'
import { Link, Navigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  })

  const { isLoggingIn, isAuthenticated, isLoginError } = useAppSelector(
    (state) => state.auth
  )

  useEffect(() => {
  if(isAuthenticated) {
    navigate(routes.events)
  }
  }, [isAuthenticated, navigate])

  const dispatch = useAppDispatch()

  const onChangeHandler = (value: Record<string, string>) => {
    setFormInput((prev) => ({
      ...prev,
      ...value,
    }))
  }

  const loginHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    dispatch(login(formInput))
  }

  return (
    <section aria-label="Login form" className={styles.loginWrapper}>
      <form onSubmit={loginHandler} className={styles.loginForm}>
        <h3 className={styles.loginLead}>
          Welcome! Please login to attend events
        </h3>
        <TextField
          placeholder="Enter your email"
          name="email"
          onChange={onChangeHandler}
          type="email"
        />
        <TextField
          placeholder="Enter your password"
          name="password"
          onChange={onChangeHandler}
          required
          type="password"
        />
        <div className={styles.loginButtonWrapper}>
          <Button>{isLoggingIn ? 'Logging you in ...' : 'Login'}</Button>
        </div>
        <h4 className={styles.error}>{isLoginError}</h4>
      </form>
      <div className={styles.links}>
        <Link to={routes.home}>Home Page</Link>
        <br />
        <Link to={routes.signup}>Signup</Link>
      </div>
    </section>
  )
}

export default Login
