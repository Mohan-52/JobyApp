import './index.css'

const ProfileCard = props => {
  const {profileData} = props
  const {name, profileImageUrl, shortBio} = profileData
  return (
    <div className="profile-card">
      <img src={profileImageUrl} alt="profile" />
      <h1 className="p-name">{name}</h1>
      <p className="bio">{shortBio}</p>
    </div>
  )
}

export default ProfileCard
