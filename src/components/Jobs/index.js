import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import ProfileCard from '../ProfileCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noResult: 'NO_RESULT',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    searchInput: '',
    employmentType: '',
    minSalry: '',
    jobListStatus: apiStatus.initial,
    profileStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileStatus: apiStatus.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Beare ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileData, profileStatus: apiStatus.success})
    } else {
      this.setState({profileStatus: apiStatus.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobListStatus: apiStatus.inProgress})
    const {searchInput, employmentType, minSalry} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minSalry}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      if (data.jobs.length === 0) {
        this.setState({jobListStatus: apiStatus.noResult})
      } else {
        const jobs = data.jobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }))
        this.setState({jobsList: jobs, jobListStatus: apiStatus.success})
      }
    } else {
      this.setState({jobListStatus: apiStatus.failure})
    }
  }

  renderOnSucces = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-container">
        {jobsList.map(job => (
          <JobItem jobDetails={job} key={job.id} />
        ))}
      </ul>
    )
  }

  getSearchRes = event => {
    this.setState({searchInput: event.target.value})
  }

  selectPackage = event => {
    this.setState({minSalry: event.target.value}, this.getJobs)
  }

  hangleOnClick = event => {
    const {employmentType} = this.state
    const {value, checked} = event.target

    const employmentTypeArray = employmentType ? employmentType.split(',') : []

    const updatedEmployeeType = checked
      ? [...employmentTypeArray, value]
      : employmentTypeArray.filter(type => type !== value)

    this.setState(
      {
        employmentType: updatedEmployeeType.join(','),
      },
      this.getJobs,
    )
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileSuccess = () => {
    const {profileData} = this.state
    return <ProfileCard profileData={profileData} />
  }

  renderProfileViews = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiStatus.inProgress:
        return this.loadingView()
      case apiStatus.success:
        return this.profileSuccess()

      case apiStatus.failure:
        return this.profileFailureView()

      default:
        return null
    }
  }

  profileFailureView = () => (
    <div>
      <button type="button" className="logot-btn" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  jobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-job-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannont seem to find the page you are looking for</p>
      <button type="button" className="logot-btn" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  noResultView = () => (
    <div className="no-res-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-img"
      />
      <h1>No Jobs Found</h1>
      <p>We couldn't find any jobs. Try any other filters.</p>
    </div>
  )

  renderJobsViews = () => {
    const {jobListStatus} = this.state

    switch (jobListStatus) {
      case apiStatus.inProgress:
        return this.loadingView()
      case apiStatus.success:
        return this.renderOnSucces()
      case apiStatus.noResult:
        return this.noResultView()

      case apiStatus.failure:
        return this.jobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-section">
          <div className="profile-filter-section">
            <div className="profile-sec">{this.renderProfileViews()}</div>
            <hr className="line" />
            <div className="filter-con">
              <h1 className="filter-h1">Type of Employment</h1>
              <ul className="checkbox-container">
                {employmentTypesList.map(type => (
                  <li className="checkbox" key={type.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={type.employmentTypeId}
                      value={type.employmentTypeId}
                      onChange={this.hangleOnClick}
                    />
                    <label htmlFor={type.employmentTypeId}>{type.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="line" />
            <div className="filter-con">
              <h1 className="filter-h1">Salary Range</h1>
              <ul className="checkbox-container">
                {salaryRangesList.map(range => (
                  <li className="checkbox" key={range.salaryRangeId}>
                    <input
                      type="radio"
                      id={range.salaryRangeId}
                      name="salaryRange"
                      onChange={this.selectPackage}
                      value={range.salaryRangeId}
                    />
                    <label htmlFor={range.salaryRangeId}>{range.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-container">
            <div className="magnify-con">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.getSearchRes}
              />
              <button
                className="mag-btn"
                onClick={this.getJobs}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="mag-icon" />
              </button>
            </div>

            {this.renderJobsViews()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
