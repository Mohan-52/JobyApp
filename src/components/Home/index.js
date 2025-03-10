import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = props => (
  <div>
    <Header />
    <div className="bottom-section">
      <div className="text-section">
        <h1 className="home-h1">Find the Job That Fits Your Life</h1>
        <p className="home-p">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="link">
          <button type="button" className="find-job-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
