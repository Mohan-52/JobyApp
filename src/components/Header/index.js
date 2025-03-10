import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaShoppingBag} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
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
      <ul className="md-links-ul">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="h-web-log"
          />
        </Link>
        <div className="flex">
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
        </div>
        <li className="logout-li">
          <button type="button" className="logot-btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
      <ul className="sm-links-ul">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="h-web-log"
          />
        </Link>
        <div className="sm-links-con">
          <li>
            <Link to="/" className="link">
              <IoMdHome className="icons" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link">
              <FaShoppingBag className="icons" />
            </Link>
          </li>
          <li>
            <button onClick={logout} className="transparent-btn">
              <FiLogOut className="icons" />
            </button>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
