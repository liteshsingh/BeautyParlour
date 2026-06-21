import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Professional beauty and makeup services in your preferred location.</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@beautyparlour.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <p>Monday - Saturday: 10 AM - 7 PM</p>
          <p>Sunday: 12 PM - 6 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Beauty Parlour. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
