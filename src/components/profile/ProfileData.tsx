import { ContactsType, UserProfileType } from "../../redux/profile-reducer"
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
    {isOwner && <Button callback={activateEditMode} name={'Edit'}/>}
    </div>
    <p>About me: {profile.aboutMe}</p>
    <p>Looking for a job: {profile.lookingForAJob}</p>
    <p>My professional skills: {profile.lookingForAJobDescription}</p>
    {
    Object.keys(profile.contacts).map((key) => {
      let value = profile.contacts[key as keyof ContactsType ]
        return <Contact
            key={key}
            contactName={key}
            contactValue={value}
        />
      })
    }
  </div>
  )
}

type ContactProps = {
  contactName: string
  contactValue?: string | null
}

export const Contact = ({contactName, contactValue}: ContactProps) => {
  return <p>{contactName}: {contactValue}</p>

}
