import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './modules/events/pages/LandingPage'
import InfoCard from './components/InfoCard'
import routes from './utils/routes'

const EventList = lazy(() => import('./modules/events/pages/EventLists'))
const Event = lazy(() => import('./modules/events/pages/EventDetails'))
const Login = lazy(() => import('./modules/auth/pages/Login'))
const Signup = lazy(() => import('./modules/auth/pages/Signup'))

function App() {
  return (
    <Suspense fallback={<InfoCard text="Loading" />}>
      <Router>
        <Routes>
          <Route path={routes.home} element={<LandingPage />} />
          <Route path={routes.events} element={<EventList />} />
          <Route path={routes.singleEvent} element={<Event />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<Signup />} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
