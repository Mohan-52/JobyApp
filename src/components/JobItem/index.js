import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {BsBag} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    title,
    location,
    packagePerAnnum,
    jobDescription,
    rating,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-card">
        <div className="logo-tile">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="c-logo"
          />
          <div className="titile-con">
            <h1>{title}</h1>
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

          <div>
            <p>{packagePerAnnum} </p>
          </div>
        </div>
        <hr />
        <h2 className="desc">Description</h2>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
