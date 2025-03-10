import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsStarFill, BsBag} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Loader from 'react-loader-spinner'
import Header from '../Header'

import SkillItem from '../SkillItem'
import SimilarjobItem from '../SimilarjobItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    status: apiStatus.initial,
    skillsList: [],
    lifeAtCompany: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: apiStatus.inProgress})

    const {match} = this.props
    const {id} = match.params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      const skills = data.job_details.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))

      console.log(data.job_details)

      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      this.setState({
        jobDetails,
        similarJobs,
        status: apiStatus.success,
        skillsList: skills,
        lifeAtCompany,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  jobsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-job-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="logot-btn" type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </>
  )

  successView = () => {
    const {jobDetails, similarJobs, skillsList, lifeAtCompany} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      rating,
      title,
      packagePerAnnum,
      id,
      location,
    } = jobDetails

    return (
      <>
        <div className="detail-job-card">
          <div className="img-title">
            <img
              src={companyLogoUrl}
              className="small-logo"
              alt="job details company logo"
            />
            <div className="h1-rating-img">
              <h1 className="h1">{title}</h1>
              <BsStarFill className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
          <div className="icons-attri">
            <div className="lcon-val">
              <IoLocation className="icons" />
              <p className="val">{location}</p>

              <BsBag className="bag icons" />
              <p className="val">{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="flex">
            <h1 className="desc">Description</h1>
            <a href={companyWebsiteUrl} className="anchor">
              Visit
              <FaExternalLinkAlt className="visit-link" />
            </a>
          </div>
          <p className="jd">{jobDescription}</p>

          <h1 className="desc h-m">Skills</h1>
          <ul className="skillaListCon">
            {skillsList.map(skill => (
              <SkillItem skilldetails={skill} key={skill.name} />
            ))}
          </ul>

          <h1 className="desc h-m">Life at Company</h1>
          <div className="life-at-com">
            <p className="life-desc">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-com-img"
            />
          </div>
        </div>
        <div className="similar-job">
          <h1 className="similar-job-h1">Similar Jobs</h1>
          <ul className="similar-jo-con">
            {similarJobs.map(smJob => (
              <SimilarjobItem jobdetails={smJob} key={smJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.inProgress:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.jobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="detail-job-bottom">{this.renderViews()}</div>
      </div>
    )
  }
}

export default JobDetails
