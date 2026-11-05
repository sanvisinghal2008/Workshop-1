import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, Check, ChevronDown, CircleAlert, Code2, Compass, LoaderCircle, RefreshCw, Search, Ticket, UsersRound, X } from 'lucide-react'
import { createRegistration, getEvents, getStudentRegistrations } from './api.js'
import './campus.css'

const categories = ['All events', 'Technology', 'Workshops', 'Music', 'Arts & culture', 'Community']
const eventImages = {
  Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=82',
  Workshops: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=82',
  Music: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=82',
  'Arts & culture': 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=82',
  Community: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=82',
}
const studentIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const todayStart = new Date()
todayStart.setHours(0, 0, 0, 0)

function categoryFor(title = '') {
  const name = title.toLowerCase()
  if (/music|frequenc|resonance/.test(name)) return 'Music'
  if (/noir|design|creative|interface|data stories/.test(name)) return 'Arts & culture'
  if (/workshop|lab|after hours|first principles/.test(name)) return 'Workshops'
  if (/community|meetup|makers|open source/.test(name)) return 'Community'
  return 'Technology'
}

function formatDate(value, options = { month: 'short', day: 'numeric' }) {
  if (!value) return 'Date to be announced'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Date to be announced' : new Intl.DateTimeFormat('en', options).format(date)
}

async function readEventList() {
  const startedAt = performance.now()
  const result = await getEvents()
  return {
    events: Array.isArray(result) ? result : result?.data ?? [],
    latency: Math.round(performance.now() - startedAt),
  }
}

function EventCard({ event, onOpen }) {
  const category = categoryFor(event.title)
  const artClass = `event-art--${category.toLowerCase().replace(/[^a-z]+/g, '-')}`
  const capacity = Number(event.capacity)

  return (
    <article className="event-card">
      <button className={`event-art ${artClass}`} onClick={() => onOpen(event)} type="button" aria-label={`View ${event.title}`}>
        <img src={eventImages[category]} alt="" loading="lazy" />
        <span className="art-wash" />
        <span className="category-tag">{category}</span>
        <span className="art-date">{formatDate(event.created_at, { month: 'short', day: '2-digit' })}</span>
      </button>
      <div className="event-card-body">
        <div className="event-meta">
          <span><CalendarDays size={15} />{formatDate(event.created_at, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          <span><UsersRound size={15} />{Number.isFinite(capacity) ? `${capacity} seats` : 'Capacity varies'}</span>
        </div>
        <h3>{event.title}</h3>
        <div className="event-card-footer">
          <span className="event-id">{event.event_id ? `#${event.event_id.slice(0, 8)}` : 'Campus event'}</span>
          <button className="text-action" onClick={() => onOpen(event)} type="button">Details <ArrowRight size={15} /></button>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [eventsError, setEventsError] = useState('')
  const [apiLatency, setApiLatency] = useState(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All events')
  const [sortOrder, setSortOrder] = useState('soonest')
  const [activeView, setActiveView] = useState('discover')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registrationStudentId, setRegistrationStudentId] = useState(() => localStorage.getItem('campusconnect-student-id') || '')
  const [registrationPending, setRegistrationPending] = useState(false)
  const [registrationFeedback, setRegistrationFeedback] = useState(null)
  const [lookupStudentId, setLookupStudentId] = useState(() => localStorage.getItem('campusconnect-student-id') || '')
  const [registrations, setRegistrations] = useState(null)
  const [registrationsLoading, setRegistrationsLoading] = useState(false)
  const [registrationsError, setRegistrationsError] = useState('')
  const [showPayload, setShowPayload] = useState(false)

  useEffect(() => {
    let active = true
    readEventList().then(({ events: rows, latency }) => {
      if (!active) return
      setEvents(rows)
      setApiLatency(latency)
      setEventsError('')
      setEventsLoading(false)
    }).catch((error) => {
      if (!active) return
      setEventsError(error.message)
      setEventsLoading(false)
    })
    return () => { active = false }
  }, [])

  async function refreshEvents() {
    setEventsLoading(true)
    setEventsError('')
    try {
      const { events: rows, latency } = await readEventList()
      setEvents(rows)
      setApiLatency(latency)
    } catch (error) {
      setEventsError(error.message)
      setApiLatency(null)
    } finally {
      setEventsLoading(false)
    }
  }

  const filteredEvents = events
    .filter((event) => activeCategory === 'All events' || categoryFor(event.title) === activeCategory)
    .filter((event) => event.title?.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((left, right) => {
      if (sortOrder === 'capacity') return Number(right.capacity || 0) - Number(left.capacity || 0)
      const leftDate = new Date(left.created_at || 0).getTime()
      const rightDate = new Date(right.created_at || 0).getTime()
      const today = todayStart.getTime()
      const leftIsPast = leftDate < today
      const rightIsPast = rightDate < today
      if (leftIsPast !== rightIsPast) return leftIsPast ? 1 : -1
      return leftIsPast ? rightDate - leftDate : leftDate - rightDate
    })

  function rememberStudentId(value) {
    const normalized = value.trim()
    setRegistrationStudentId(normalized)
    setLookupStudentId(normalized)
    if (normalized) localStorage.setItem('campusconnect-student-id', normalized)
  }

  async function handleRegistration(event) {
    event.preventDefault()
    const studentId = registrationStudentId.trim()
    if (!selectedEvent) return
    if (!studentIdPattern.test(studentId)) {
      setRegistrationFeedback({ kind: 'error', message: 'Enter a valid student ID in UUID format.' })
      return
    }
    setRegistrationPending(true)
    setRegistrationFeedback(null)
    rememberStudentId(studentId)
    try {
      const result = await createRegistration({ eventId: selectedEvent.event_id, studentId })
      setRegistrationFeedback({ kind: 'success', message: 'Registration submitted successfully.', data: result })
    } catch (error) {
      setRegistrationFeedback({ kind: 'error', message: error.message })
    } finally {
      setRegistrationPending(false)
    }
  }

  async function handleRegistrationLookup(event) {
    event.preventDefault()
    const studentId = lookupStudentId.trim()
    if (!studentIdPattern.test(studentId)) {
      setRegistrationsError('Enter a valid student ID in UUID format.')
      setRegistrations(null)
      return
    }
    rememberStudentId(studentId)
    setRegistrationsLoading(true)
    setRegistrationsError('')
    try {
      const result = await getStudentRegistrations(studentId)
      setRegistrations(Array.isArray(result) ? result : result?.data ?? result?.registrations ?? [])
    } catch (error) {
      setRegistrationsError(error.message)
      setRegistrations(null)
    } finally {
      setRegistrationsLoading(false)
    }
  }

  function openRegistration(event) {
    setSelectedEvent(event)
    setRegistrationStudentId(localStorage.getItem('campusconnect-student-id') || '')
    setRegistrationFeedback(null)
  }

  const apiStatus = eventsError ? 'offline' : eventsLoading ? 'pending' : 'online'

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" onClick={() => setActiveView('discover')} aria-label="CampusConnect home">
            <span className="brand-mark"><Compass size={21} strokeWidth={2.2} /></span>
            <span>Campus<span>Connect</span></span>
          </a>
          <nav className="primary-nav" aria-label="Main navigation">
            <button className={activeView === 'discover' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveView('discover')} type="button">Explore</button>
            <button className={activeView === 'tickets' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveView('tickets')} type="button"><span className="nav-full">My registrations</span><span className="nav-compact">Tickets</span></button>
          </nav>
          <div className="topbar-actions">
            <div className={`api-status ${apiStatus}`}><span className="status-dot" /><span>{eventsError ? 'API offline' : eventsLoading ? 'Connecting' : 'API live'}</span>{!eventsLoading && !eventsError && apiLatency !== null && <span className="latency">{apiLatency} ms</span>}</div>
            <button className="icon-button" onClick={() => void refreshEvents()} disabled={eventsLoading} type="button" title="Refresh events" aria-label="Refresh events"><RefreshCw size={17} className={eventsLoading ? 'spinning' : ''} /></button>
          </div>
        </div>
      </header>

      <main id="top" className="page-content">
        <section className="intro-band">
          <div className="intro-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> CAMPUS LIFE, IN ONE PLACE</span>
            <h1>Make room for <em>something new.</em></h1>
            <p>Find workshops, late-night sets, and the people you haven’t met yet.</p>
          </div>
          <div className="intro-note"><span className="note-icon"><CalendarDays size={20} /></span><span><strong>{events.length ? `${events.length} events` : 'New events'}</strong><small>coming up around campus</small></span><ArrowRight className="note-arrow" size={19} /></div>
        </section>

        {activeView === 'discover' ? (
          <>
            <section className="browse-heading">
              <div><span className="section-kicker">THE CAMPUS CALENDAR</span><h2>Find your next thing</h2></div>
              <span className="browse-count">{eventsLoading ? 'Loading events' : `${filteredEvents.length} events to explore`}</span>
            </section>
            <section className="filters-row" aria-label="Event filters">
              <div className="category-tabs" role="group" aria-label="Filter by category">
                {categories.map((category) => <button key={category} className={activeCategory === category ? 'category-tab selected' : 'category-tab'} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}
              </div>
              <div className="browse-tools">
                <label className="search-field"><Search size={17} aria-hidden="true" /><input aria-label="Search events" onChange={(event) => setQuery(event.target.value)} placeholder="Search events" value={query} />{query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</label>
                <label className="sort-select"><span className="sr-only">Sort events</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="soonest">Soonest</option><option value="capacity">Largest capacity</option></select><ChevronDown size={15} aria-hidden="true" /></label>
              </div>
            </section>

            {eventsError && <div className="error-banner" role="alert"><CircleAlert size={18} /><div><strong>Couldn’t load events</strong><span>{eventsError}</span></div><button className="text-action" onClick={() => void refreshEvents()} type="button">Retry <RefreshCw size={14} /></button></div>}
            {eventsLoading && events.length === 0 ? (
              <div className="event-grid" aria-label="Loading events">{Array.from({ length: 6 }, (_, index) => <div className="event-skeleton" key={index}><div /><span /><span /></div>)}</div>
            ) : filteredEvents.length ? (
              <div className="event-grid">{filteredEvents.map((event) => <EventCard event={event} key={event.event_id} onOpen={openRegistration} />)}</div>
            ) : !eventsError && (
              <div className="empty-state"><div className="empty-icon"><Search size={23} /></div><h3>No events match that search</h3><p>Try a different title or choose another category.</p><button className="secondary-button" onClick={() => { setQuery(''); setActiveCategory('All events') }} type="button">Clear filters</button></div>
            )}

            <details className="api-inspector">
              <summary><span className="inspector-title"><Code2 size={16} />Live API response</span><span className="endpoint"><b>GET</b> /api/events</span><ChevronDown className="inspector-chevron" size={16} /></summary>
              <div className="inspector-body"><p>Live data from <code>zero5nov-workshop.onrender.com</code></p><button className="text-action" type="button" onClick={() => setShowPayload((value) => !value)}>{showPayload ? 'Hide JSON' : 'Show JSON'}</button>{showPayload && <pre>{JSON.stringify(events, null, 2)}</pre>}</div>
            </details>
          </>
        ) : (
          <section className="registrations-view">
            <div className="registrations-heading"><div className="registration-heading-icon"><Ticket size={21} /></div><div><span className="section-kicker">YOUR CAMPUS PASSES</span><h2>My registrations</h2><p>Look up registrations with your student ID.</p></div></div>
            <form className="lookup-form" onSubmit={handleRegistrationLookup}>
              <label htmlFor="lookup-student-id">Student ID</label>
              <div className="lookup-controls"><input id="lookup-student-id" autoComplete="off" onChange={(event) => setLookupStudentId(event.target.value)} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={lookupStudentId} /><button className="primary-button" disabled={registrationsLoading} type="submit">{registrationsLoading ? <LoaderCircle className="spinning" size={17} /> : <Search size={17} />}Find registrations</button></div>
              {registrationsError && <p className="form-error" role="alert">{registrationsError}</p>}
            </form>
            {registrationsLoading && <div className="lookup-message"><LoaderCircle className="spinning" size={18} />Looking up registrations…</div>}
            {registrations && !registrationsLoading && (registrations.length ? (
              <div className="registration-list">{registrations.map((registration, index) => <article className="registration-row" key={registration.registration_id || registration.id || index}><div className="ticket-icon"><Ticket size={19} /></div><div className="registration-info"><strong>{registration.title || registration.event_title || registration.event?.title || 'Campus event'}</strong><span>{registration.registration_id || registration.id || registration.event_id || 'Registration'}</span></div><span className="registration-status"><Check size={14} />{registration.status || 'Registered'}</span></article>)}</div>
            ) : (
              <div className="empty-state ticket-empty"><div className="empty-icon"><Ticket size={22} /></div><h3>No registrations yet</h3><p>When you register for a campus event, it will show up here.</p><button className="secondary-button" onClick={() => setActiveView('discover')} type="button">Explore events <ArrowRight size={15} /></button></div>
            ))}
          </section>
        )}

        <footer className="page-footer"><span>CampusConnect <span className="footer-separator">/</span> Find your people.</span><button className="footer-api" onClick={() => { setActiveView('discover'); setShowPayload(true); document.querySelector('.api-inspector')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} type="button">API <b>GET</b> /api/events <ArrowRight size={13} /></button></footer>
      </main>

      {selectedEvent && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEvent(null) }}>
          <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
            <div className={`modal-art event-art--${categoryFor(selectedEvent.title).toLowerCase().replace(/[^a-z]+/g, '-')}`}><img src={eventImages[categoryFor(selectedEvent.title)]} alt="" /><span className="art-wash" /><button className="modal-close" onClick={() => setSelectedEvent(null)} type="button" title="Close dialog" aria-label="Close dialog"><X size={19} /></button><span className="category-tag">{categoryFor(selectedEvent.title)}</span></div>
            <div className="modal-content">
              <div className="modal-date"><CalendarDays size={15} />{formatDate(selectedEvent.created_at, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <h2 id="registration-title">{selectedEvent.title}</h2>
              <div className="modal-facts"><span><UsersRound size={16} />Capacity {Number.isFinite(Number(selectedEvent.capacity)) ? selectedEvent.capacity : 'not listed'}</span><span className="modal-id">ID {selectedEvent.event_id}</span></div>
              <form className="registration-form" onSubmit={handleRegistration}>
                <label htmlFor="registration-student-id">Student ID <span>Required</span></label>
                <input id="registration-student-id" aria-label="Student ID" autoComplete="off" onChange={(event) => setRegistrationStudentId(event.target.value)} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={registrationStudentId} />
                <p className="field-help">Use the UUID associated with your student account.</p>
                {registrationFeedback && <div className={`form-feedback ${registrationFeedback.kind}`} role="status">{registrationFeedback.kind === 'success' ? <Check size={17} /> : <CircleAlert size={17} />}<div><strong>{registrationFeedback.message}</strong>{registrationFeedback.data && <pre>{JSON.stringify(registrationFeedback.data, null, 2)}</pre>}</div></div>}
                <button className="primary-button register-button" disabled={registrationPending} type="submit">{registrationPending ? <LoaderCircle size={17} className="spinning" /> : <Ticket size={17} />}{registrationPending ? 'Submitting…' : 'Register for event'}{!registrationPending && <ArrowRight size={16} />}</button>
                <div className="request-preview"><b>POST</b><code>/api/registrations</code><span>event_id · student_id</span></div>
              </form>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
