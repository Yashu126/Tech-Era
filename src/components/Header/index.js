import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <nav className="nav-con">
    <Link className="link" to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        width="150"
      />
    </Link>
  </nav>
)

export default Header
