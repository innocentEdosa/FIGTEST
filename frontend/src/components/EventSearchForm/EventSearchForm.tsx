import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '../Input/TextField'
import Button from '../Button'
import routes from '../../utils/routes'
import styles from './eventSearchForm.module.css'

const EventSearchForm = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<Record<string, string>>({
    search: '',
  })

  const onInputChange = (value: Record<string, string>) => {
    setSearchTerm(value)
  }

  const navigateToMoreEventsPage = useCallback(
    () =>
      navigate({
        pathname: routes.events,
        search: `search=${searchTerm.search}`,
      }),
    [navigate, searchTerm]
  )

  return (
    <form aria-label="Event search form" className={styles.formWrapper}>
      <TextField
        name="search"
        value={searchTerm.search}
        onChange={onInputChange}
        placeholder="Search for events"
      />
      <Button disabled={!searchTerm} onClick={navigateToMoreEventsPage}>
        Search
      </Button>
    </form>
  )
}

export default EventSearchForm
