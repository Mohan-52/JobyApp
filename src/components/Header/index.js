import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="h-web-log"
        />
      </Link>
      <ul>
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            Jobs
          </Link>
        </li>
      </ul>

      <li>
        <button type="button" className="logot-btn" onClick={logout}>
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
