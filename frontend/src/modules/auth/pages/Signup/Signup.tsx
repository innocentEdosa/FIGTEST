import { useState, useEffect, FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import routes from '../../../../utils/routes'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { signUp } from '../../service/slice'
import { getCategories } from '../../../category/service/slice'
import TextField from '../../../../components/Input/TextField'
import CheckField from '../../../../components/Input/CheckField'
import styles from './signup.module.css'
import Button from '../../../../components/Button'
import { Link } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  })

  const { categories } = useAppSelector((state) => state.category);

  const { isSigningUp, isAuthenticated, isSignupError } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.events)
    }
  }, [isAuthenticated, navigate])


  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const onChangeHandler = (value: Record<string, string | boolean>) => {
    setFormInput((prev) => ({
      ...prev,
      ...value,
    }))
  }

  const formatFormInput = (formEntry: Record<string, string | boolean>) => {
    const { email, password, ...rest } = formEntry
    const otherKeys = Object.keys(rest)
    const interests = otherKeys.filter((k: string) => !!formEntry[k])
    return { email, password, interests }
  }

  const signUpHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const data = formatFormInput(formInput)
    dispatch(signUp(data as { email: string; password: string }))
  }

  return (
    // I am reallying on simple html validate for email here. There are better approach to this
    <section aria-label="signup form" className={styles.signupWrapper}>
      <form onSubmit={signUpHandler} className={styles.signupForm}>
        <h3 className={styles.signupLead}>Welcome! Please create an account</h3>
        <TextField
          type="email"
          placeholder="Enter your email"
          value={formInput.email}
          name="email"
          onChange={onChangeHandler}
          required
        />
        <TextField
          type="password"
          required
          placeholder="Enter your password"
          name="password"
          onChange={onChangeHandler}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          min="8"
        />
        <div>
          <span>Please select the category you are interested in</span>
          <ul className={styles.categoryWrapper}>
            {!!categories?.length &&
              categories.map((category: { _id: string; title: string }) => {
                return (
                  <li key={category._id} className={styles.categoryItem}>
                    <CheckField
                      onChange={onChangeHandler}
                      name={category.title}
                      label={category?.title}
                    />{' '}
                  </li>
                )
              })}
          </ul>
        </div>
        <div className={styles.signupButtonWrapper}>
          <Button>{isSigningUp ? 'Signing you up' : 'Sign up'}</Button>
        </div>

        <h4 className={styles.error}>{isSignupError}</h4>
      </form>

      <div className={styles.links}>
        <Link to={routes.home}>Home Page</Link>
        <br />
        <Link to={routes.login}>Login</Link>
      </div>
    </section>
  )
}

export default Signup
