import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>💄 Beauty Parlour</h1>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/booking">Book Appointment</Link>
          <Link to="/admin/login">Admin</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
