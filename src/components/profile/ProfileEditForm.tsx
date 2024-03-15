import { Button } from "antd"
import { UserProfileType } from "../../redux/profile-reducer"
import { Input, createField } from "../common/formContolls/FormControls"
import { InjectedFormProps, reduxForm } from "redux-form"

type ProfileEditFormProps = {
  profile: UserProfileType
  isOwner: boolean
}

type  ProfileFormField = {
  aboutMe: string | null
  instagram: string | null
  lookingJob: boolean
  github: string | null
}


const ProfileEditForm = (props: InjectedFormProps<ProfileFormField, ProfileEditFormProps> & ProfileEditFormProps) => {


  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {props.isOwner && <Button name={'Save'}/>}
      </div>
      <div>
      {createField({type: 'text', placeholder: 'About me', name: 'aboutMe', component: Input, validators: []})}
        <p>About me: {props.profile.aboutMe}</p>
        <p>Instagram: {props.profile.contacts.instagram}</p>
        <p>Looking for a job: {props.profile.lookingForAJob}</p>
        <p>GitHub: {props.profile.contacts.github}</p>
      </div>

  </form>
  )
}

//оборачиваем форму контейнерной компонентой (HOC)
export const ProfileEditFormRedux = reduxForm<ProfileFormField, ProfileEditFormProps>({
  form: 'profile', //присваиваем уникальное название форме
})(ProfileEditForm)

