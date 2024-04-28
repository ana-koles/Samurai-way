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
    <p>Instagram: {profile.contacts.instagram}</p>
    <p>Looking for a job: {profile.lookingForAJob}</p>
    <p>GitHub: {profile.contacts.github}</p>
    <p>My professional skills: {profile.lookingForAJobDescription}</p>
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
