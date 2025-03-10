import {BsStarFill, BsBag} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import './index.css'

const SimilarjobItem = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobdetails

  return (
    <li>
      <div className="similar-job-card">
        <div className="img-title">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="simlar-compay-img"
          />
          <div className="h1-rating-img">
            <h1 className="h1">{title}</h1>
            <BsStarFill className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
        <h1 className="desc">Description</h1>

        <p>{jobDescription}</p>

        <div className="lcon-val mar-top">
          <IoLocation className="icons" />
          <p className="val">{location}</p>

          <BsBag className="bag icons" />
          <p className="val">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarjobItem
