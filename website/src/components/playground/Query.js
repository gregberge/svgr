import * as React from 'react'
import qs from 'query-string'
import { createBrowserHistory } from 'history'

function formatQuery(state, initialState) {
  const lightState = Object.entries(state).reduce(
    (lightState, [key, value]) => {
      if (initialState[key] !== value) {
        lightState[key] = value
      }
      return lightState
    },
    {},
  )
  const qsStr = qs.stringify(lightState, { arrayFormat: 'bracket' })
  return qsStr ? `?${qsStr}` : ''
}

function parseQuery(query) {
  return qs.parse(query, { arrayFormat: 'bracket', parseBooleans: true })
}

function getLocation() {
  if (typeof window === 'undefined')
    return { location: { search: '', pathname: '' } }
  return { location: window.location }
}

let browserHistory

function useHistory() {
  if (typeof window === 'undefined') return null
  if (browserHistory) {
    return browserHistory
  }
  browserHistory = createBrowserHistory()
  return browserHistory
}

function useLocation() {
  const history = useHistory()
  const [location, setLocation] = React.useState(getLocation)
  React.useEffect(
    () => history.listen((location) => setLocation(location)),
    [history],
  )
  return location
}

export function useQuery(getInitialState = {}) {
  const history = useHistory()
  const [initialState] = React.useState(getInitialState)
  const { location } = useLocation()
  const locationRef = React.useRef(location)
  React.useEffect(() => {
    locationRef.current = location
  })
  const setState = React.useCallback(
    (state) => {
      const search = formatQuery({ ...initialState, ...state }, initialState)
      if (locationRef.current.search !== search) {
        history.push({
          pathname: locationRef.current.pathname,
          search,
        })
      }
    },
    [history, initialState],
  )
  const state = React.useMemo(
    () => ({ ...initialState, ...parseQuery(location.search) }),
    [location.search, initialState],
  )
  React.useEffect(() => {
    setState(parseQuery(locationRef.current.search))
  }, [history, setState])
  return [state, setState]
}
