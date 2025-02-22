import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    console.log(history)

    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errorMsg: errMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      console.log('Success')
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log('Failure')
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-card" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="web-log"
          />
          <form className="form">
            <label htmlFor="userName" className="label">
              USERNAME
            </label>
            <input
              type="text"
              className="text-input"
              placeholder="Username"
              id="userName"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="pwd" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              className="text-input"
              placeholder="Password"
              id="pwd"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="errMsg">* {errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
