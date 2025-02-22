import './index.css'

const SkillItem = props => {
  const {skilldetails} = props
  const {imageUrl, name} = skilldetails
  return (
    <li className="skill-name">
      <img src={imageUrl} alt={name} className="skill-img" />
      <h1>{name}</h1>
    </li>
  )
}

export default SkillItem
