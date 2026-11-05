const apiOrigin = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || 'https://zero5nov-workshop.onrender.com')

async function request(path, options = {}) {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  if (options.body) headers.set('Content-Type', 'application/json')

  let response
  try {
    response = await fetch(`${apiOrigin}${path}`, { ...options, headers })
  } catch {
    throw new Error('Could not reach the API. Check the connection and the API CORS settings.')
  }

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || `The API returned ${response.status}.`)
  }
  return payload
}

export function getEvents() {
  return request('/api/events')
}

export function getStudentRegistrations(studentId) {
  const query = new URLSearchParams({ student_id: studentId })
  return request(`/api/me/registrations?${query}`)
}

export function createRegistration({ eventId, studentId }) {
  return request('/api/registrations', {
    method: 'POST',
    body: JSON.stringify({ event_id: eventId, student_id: studentId }),
  })
}