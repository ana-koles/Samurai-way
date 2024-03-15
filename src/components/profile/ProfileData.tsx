import { UserProfileType } from "../../redux/profile-reducer"
import { Button } from "../button/Button"


type ProfileDataProps = {
  profile: UserProfileType
  isOwner: boolean
  activateEditMode: () => void
}

export const ProfileData = ({profile, isOwner, activateEditMode, ...restProps}: ProfileDataProps) => {
  return (
  <div>
    <div>
    {isOwner && <Button callback={activateEditMode} name={'Edit Profile'}/>}
    </div>
    <p>About me: {profile.aboutMe}</p>
    <p>Instagram: {profile.contacts.instagram}</p>
    <p>Looking for a job: {profile.lookingForAJob}</p>
    <p>GitHub: {profile.contacts.github}</p>
  </div>
  )
}

