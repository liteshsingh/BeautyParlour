import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './Confirmation.css'

function Confirmation() {
  const { appointmentId } = useParams()

  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`
        )

        setAppointment(response.data)
      } catch (err) {
        setError('Failed to load appointment details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointment()
  }, [appointmentId])

  if (loading) {
    return (
      <div className="confirmation">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="confirmation error-container">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="confirmation">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <h1>✓ Appointment Confirmed!</h1>

          <p>
            Thank you for booking with
            {' '}
            <strong>
              Glamup by POOJA Makeup Artist & Hairstylist
            </strong>
          </p>
        </div>

        <div className="confirmation-details">
          <h2>Booking Details</h2>

          <div className="details-grid">
            <div className="detail-item">
              <label>Appointment ID</label>
              <p className="appointment-id">
                {appointmentId}
              </p>
            </div>

            <div className="detail-item">
              <label>Name</label>
              <p>{appointment?.name}</p>
            </div>

            <div className="detail-item">
              <label>Email</label>
              <p>{appointment?.email}</p>
            </div>

            <div className="detail-item">
              <label>Phone</label>
              <p>{appointment?.phone}</p>
            </div>

            <div className="detail-item">
              <label>Service</label>
              <p>{appointment?.Service}</p>
            </div>

            <div className="detail-item">
              <label>Service Type</label>
              <p>{appointment?.makeupType}</p>
            </div>

            <div className="detail-item">
              <label>Date</label>
              <p>
                {appointment?.date
                  ? new Date(
                      appointment.date
                    ).toLocaleDateString()
                  : '-'}
              </p>
            </div>

            <div className="detail-item">
              <label>Time</label>
              <p>{appointment?.time}</p>
            </div>

            <div className="detail-item">
              <label>Address</label>
              <p>
                {appointment?.customer_address ||
                  appointment?.location ||
                  'Not Provided'}
              </p>
            </div>

            <div className="detail-item">
              <label>Status</label>
              <p className="status">
                {appointment?.status ||
                  'Confirmed'}
              </p>
            </div>

            {appointment?.latitude &&
              appointment?.longitude && (
                <div className="detail-item">
                  <label>Location Map</label>

                  <a
                    href={`https://maps.google.com/?q=${appointment.latitude},${appointment.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📍 View Location
                  </a>
                </div>
              )}
          </div>
        </div>

        <div className="confirmation-message">
          <p>
            A confirmation email has been sent to
            {' '}
            <strong>
              {appointment?.email}
            </strong>
          </p>

          <p>
            Our team will contact you shortly
            to confirm the booking.
          </p>
        </div>

        <div className="confirmation-actions">
          <Link
            to="/"
            className="btn-home"
          >
            Back to Home
          </Link>

          <button
            className="btn-print"
            onClick={() => window.print()}
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation