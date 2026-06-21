import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

function Home() {
  const [services, setServices] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [servicesRes, settingsRes] =
        await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/beauty-services`
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/website-settings`
          ),
        ])

      setServices(
  Array.isArray(servicesRes.data)
    ? servicesRes.data
    : servicesRes.data.results || []
)

      if (
        settingsRes.data &&
        settingsRes.data.length > 0
      ) {
        setSettings(settingsRes.data[0])
      }
    } catch (error) {
      console.error(
        'Failed to load homepage data',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="home">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className="home">
      {/* HERO */}

      <section className="hero">
        {settings?.logo_url && (
          <img
            src={settings.logo_url}
            alt="Logo"
            className="hero-logo"
          />
        )}

        <h1>
          {settings?.business_name ||
            'Glamup by POOJA Makeup Artist & Hairstylist'}
        </h1>

        <p>
          Professional Makeup & Beauty Services
          At Your Doorstep
        </p>

        <Link
          to="/booking"
          className="cta-button"
        >
          Book Your Appointment Now
        </Link>
      </section>

      {/* SERVICES */}

      <section className="services">
        <h2>Our Services</h2>

        <div className="services-container">
          {services.length === 0 ? (
            <p>No services available.</p>
          ) : (
            Object.entries(
              services.reduce((acc, service) => {
                const type = service.service_group || 'General'
                if (!acc[type]) acc[type] = []
                acc[type].push(service)
                return acc
              }, {})
            ).map(([type, typeServices]) => (
              <div key={type} className="service-group" style={{ marginBottom: '40px' }}>
                <h3 style={{ textAlign: 'left', borderBottom: '2px solid #ff4b8b', paddingBottom: '10px', color: '#333' }}>
                  {type}
                </h3>
                <div className="services-grid" style={{ marginTop: '20px' }}>
                  {typeServices.map((service) => (
                    <div
                      key={service.id}
                      className="service-card"
                    >
                      {service.image_url && (
                        <img
                          src={service.image_url}
                          alt={service.makeup_type}
                          className="service-image"
                        />
                      )}

                      <h3>{service.makeup_type}</h3>

                      <p>
                        {service.description}
                      </p>

                      <div className="price-section">
                        {service.offer_price ? (
                          <>
                            <span
                              style={{
                                textDecoration:
                                  'line-through',
                                marginRight: '10px',
                              }}
                            >
                              ₹{service.price}
                            </span>

                            <span
                              style={{
                                color: 'green',
                                fontWeight: 'bold',
                              }}
                            >
                              ₹{service.offer_price}
                            </span>
                          </>
                        ) : (
                          <span>
                            ₹{service.price}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        Duration:
                        {' '}
                        {service.duration_minutes}
                        {' '}
                        mins
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* WHY US */}

      <section className="why-us">
        <h2>Why Choose Us?</h2>

        <div className="features">
          <div className="feature">
            <h3>💄 Expert Makeup Artists</h3>

            <p>
              Professional bridal and
              party makeup services.
            </p>
          </div>

          <div className="feature">
            <h3>🏠 Home Service</h3>

            <p>
              We visit your location for
              maximum convenience.
            </p>
          </div>

          <div className="feature">
            <h3>✨ Premium Products</h3>

            <p>
              High-quality cosmetics and
              beauty products.
            </p>
          </div>

          <div className="feature">
            <h3>📅 Easy Booking</h3>

            <p>
              Book online and receive
              instant confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      {settings && (
        <section
          className="contact-section"
          style={{
            textAlign: 'center',
            marginTop: '50px',
          }}
        >
          <h2>Contact Us</h2>

          {settings.phone && (
            <p>
              📞 {settings.phone}
            </p>
          )}

          {settings.email && (
            <p>
              📧 {settings.email}
            </p>
          )}

          {settings.address && (
            <p>
              📍 {settings.address}
            </p>
          )}
        </section>
      )}
    </div>
  )
}

export default Home