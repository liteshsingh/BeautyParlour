import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Booking.css'

function Booking() {
  const navigate = useNavigate()

  const [services, setServices] = useState([])
  const [loadingServices, setLoadingServices] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    makeupType: '',
    date: '',
    time: '',
    location: '',
    customer_address: '',
    latitude: '',
    longitude: '',
    notes: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/beauty-services`
      )

      setServices(
  Array.isArray(response.data)
    ? response.data
    : response.data.results || []
)
    } catch (err) {
      console.error(
        'Failed to load services',
        err
      )
    } finally {
      setLoadingServices(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'service') {
        updated.makeupType = ''
      }
      return updated
    })
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        'Geolocation is not supported by your browser.'
      )
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,

          latitude: Number(
            position.coords.latitude.toFixed(7)
          ),

          longitude: Number(
            position.coords.longitude.toFixed(7)
          ),

          location: 'Customer Location',
        }))
      },
      () => {
        alert(
          'Unable to retrieve your location.'
        )
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments`,
        formData
      )

      navigate(
        `/confirmation/${response.data.appointmentId}`
      )
    } catch (err) {
      console.error(err)

      if (err.response?.data) {
        setError(
          JSON.stringify(
            err.response.data,
            null,
            2
          )
        )
      } else {
        setError(
          'Failed to book appointment.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="booking">
      <h1>
        Glamup by POOJA
      </h1>

      <h3>
        Makeup Artist & Hairstylist
      </h3>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="booking-form"
      >
        {/* CUSTOMER */}

        <div className="form-row">
          <div className="form-group">
            <label>
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* SERVICE */}

        <div className="form-row">
          <div className="form-group">
            <label>
              Service Group *
            </label>

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">
                -- Choose Group --
              </option>

              {Array.from(
                new Set(
                  services.map(
                    (s) => s.service_group || 'General'
                  )
                )
              ).map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Makeup Type *
            </label>

            <select
              name="makeupType"
              value={formData.makeupType}
              onChange={handleChange}
              required
              disabled={!formData.service}
            >
              <option value="">
                -- Choose Type --
              </option>

              {services
                .filter(
                  (s) =>
                    (s.service_group || 'General') ===
                    formData.service
                )
                .map((service) => (
                  <option
                    key={service.id}
                    value={service.makeup_type}
                  >
                    {service.makeup_type}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* DATE */}

        <div className="form-row">
          <div className="form-group">
            <label>
              Preferred Date *
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={
                new Date()
                  .toISOString()
                  .split('T')[0]
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Preferred Time *
            </label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ADDRESS */}

        <div className="form-group">
          <label>
            Complete Address *
          </label>

          <textarea
            name="customer_address"
            rows="4"
            value={
              formData.customer_address
            }
            onChange={handleChange}
            placeholder="Enter your complete address"
            required
          />
        </div>

        {/* LOCATION */}

        <div className="form-group">
          <button
            type="button"
            onClick={
              getCurrentLocation
            }
          >
            📍 Use My Current Location
          </button>

          {formData.latitude && (
            <p
              style={{
                color: 'green',
                marginTop: '10px',
              }}
            >
              Location captured
              successfully
            </p>
          )}
        </div>

        {/* NOTES */}

        <div className="form-group">
          <label>
            Additional Notes
          </label>

          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requirements..."
          />
        </div>

        {/* SUBMIT */}

        <div className="form-actions">
          <button
            type="submit"
            disabled={
              loading ||
              loadingServices
            }
            className="btn-submit"
          >
            {loading
              ? 'Booking...'
              : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Booking