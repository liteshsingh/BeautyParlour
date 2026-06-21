import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminLogin.css'

function AdminLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      )

      // Store token in localStorage
      localStorage.setItem('adminToken', response.data.token)
      localStorage.setItem('adminUser', JSON.stringify(response.data.user))

      // Redirect to dashboard
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-card">
          <h1>Admin Login</h1>
          <p className="subtitle">Beauty Parlour Management</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@beautyparlour.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-login">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-footer">
            <p>Demo credentials (if available)</p>
            <p className="demo-text">Email: admin@beautyparlour.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
