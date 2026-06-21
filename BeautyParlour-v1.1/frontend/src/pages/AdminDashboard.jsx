import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appointmentService } from '../services/api'
import './AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')

    if (!token) {
      navigate('/admin/login')
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }

    fetchAppointments()
  }, [navigate])

  const fetchAppointments = async () => {
    try {
      const response =
        await appointmentService.getAppointments()

      setAppointments(response.data)
    } catch (err) {
      setError('Failed to load appointments')

      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        navigate('/admin/login')
      }

      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/')
  }

  const handleStatusChange = async (
    appointmentId,
    newStatus
  ) => {
    try {
      await appointmentService.updateAppointment(
        appointmentId,
        {
          status: newStatus,
        }
      )

      fetchAppointments()
    } catch (err) {
      console.error(
        'Error updating status:',
        err
      )
    }
  }

  const filteredAppointments =
    appointments.filter((apt) => {
      if (filter === 'all') return true

      return (
        apt.status?.toLowerCase() ===
        filter.toLowerCase()
      )
    })

  if (!user && loading) {
    return (
      <div className="admin-dashboard">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Glamup by POOJA</h1>
            <p>
              Makeup Artist &
              Hairstylist
            </p>
          </div>

          <div className="user-info">
            <span>
              Welcome{' '}
              {user?.name || 'Admin'}
            </span>

            <button
              onClick={handleLogout}
              className="btn-logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">

        {/* STATS */}

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>
              {appointments.length}
            </h3>
            <p>
              Total Appointments
            </p>
          </div>

          <div className="stat-card">
            <h3>
              {
                appointments.filter(
                  (a) =>
                    a.status ===
                    'Confirmed'
                ).length
              }
            </h3>
            <p>Confirmed</p>
          </div>

          <div className="stat-card">
            <h3>
              {
                appointments.filter(
                  (a) =>
                    a.status ===
                    'Completed'
                ).length
              }
            </h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>
              {
                appointments.filter(
                  (a) =>
                    a.status ===
                    'Cancelled'
                ).length
              }
            </h3>
            <p>Cancelled</p>
          </div>
        </div>

        {/* APPOINTMENTS */}

        <div className="appointments-section">
          <div className="section-header">
            <h2>
              Customer Appointments
            </h2>

            <div className="filter-buttons">

              <button
                className={`filter-btn ${
                  filter === 'all'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setFilter('all')
                }
              >
                All
              </button>

              <button
                className={`filter-btn ${
                  filter ===
                  'confirmed'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setFilter(
                    'confirmed'
                  )
                }
              >
                Confirmed
              </button>

              <button
                className={`filter-btn ${
                  filter ===
                  'completed'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setFilter(
                    'completed'
                  )
                }
              >
                Completed
              </button>

              <button
                className={`filter-btn ${
                  filter ===
                  'cancelled'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setFilter(
                    'cancelled'
                  )
                }
              >
                Cancelled
              </button>

            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <p>
              Loading appointments...
            </p>
          ) : filteredAppointments.length === 0 ? (
            <p className="no-appointments">
              No appointments found
            </p>
          ) : (
            <div className="appointments-list">

              {filteredAppointments.map(
                (appointment) => (
                  <div
                    key={appointment.id}
                    className="appointment-card"
                  >

                    <div className="appointment-header">
                      <h3>
                        {appointment.name}
                      </h3>

                      <span
                        className={`status-badge ${appointment.status?.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="appointment-details">

                      <div className="detail">
                        <span className="label">
                          Date:
                        </span>

                        <span className="value">
                          {new Date(
                            appointment.date
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="detail">
                        <span className="label">
                          Time:
                        </span>

                        <span className="value">
                          {appointment.time}
                        </span>
                      </div>

                      <div className="detail">
                        <span className="label">
                          Service:
                        </span>

                        <span className="value">
                          {appointment.Service}
                          {' - '}
                          {appointment.makeupType}
                        </span>
                      </div>

                      <div className="detail">
                        <span className="label">
                          Address:
                        </span>

                        <span className="value">
                          {appointment.customer_address ||
                            appointment.location}
                        </span>
                      </div>

                      <div className="detail">
                        <span className="label">
                          Contact:
                        </span>

                        <span className="value">
                          {appointment.email}
                          {' / '}
                          {appointment.phone}
                        </span>
                      </div>

                      {appointment.latitude &&
                        appointment.longitude && (
                          <div className="detail">
                            <span className="label">
                              Map:
                            </span>

                            <a
                              href={`https://maps.google.com/?q=${appointment.latitude},${appointment.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              📍 Open Location
                            </a>
                          </div>
                        )}

                    </div>

                    <div className="appointment-actions">
                      <select
                        value={
                          appointment.status ||
                          'Confirmed'
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            appointment.id,
                            e.target.value
                          )
                        }
                        className="status-select"
                      >
                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </div>

                  </div>
                )
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard