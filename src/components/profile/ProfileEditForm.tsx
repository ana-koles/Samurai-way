import { UserProfileType } from "../../redux/profile-reducer"
import { Input, Textarea, createField } from "../common/formContolls/FormControls"
import { InjectedFormProps, reduxForm } from "redux-form"
import { Button } from "../button/Button"
import s from './Profile.module.css'

type ProfileEditFormProps = {
  profile: UserProfileType
  isOwner: boolean
}

type  ProfileFormField = {
  aboutMe: string | null
  instagram: string | null
  lookingJob: boolean
  github: string | null
  lookingForAJobDescription: string | null

}


const ProfileEditForm = (props: InjectedFormProps<ProfileFormField, ProfileEditFormProps> & ProfileEditFormProps) => {

  return (
    <form onSubmit={props.handleSubmit} className={s.profileForm}>
        <div>
          <label>About me: {createField({placeholder: 'About me...', name: 'aboutMe', component: Textarea, validators: []})}</label>
          <label>Instagram: {createField({type: 'text', placeholder: 'Instagram', name: 'instagram', component: Input, validators: []})}</label>
          <label>Looking for a job: {createField({type: 'checkbox', name: 'lookingJob', component: Input, validators: []})}</label>
          <label>GitHub: {createField({type: 'text', placeholder: 'GitHub', name: 'github', component: Input, validators: []})} </label>
          <label>My professional skills: {createField({placeholder: 'My professional skills', name: 'lookingForAJobDescription', component: Textarea, validators: [] })}</label>
        </div>
      <Button type={'submit'} name={'Save'}/>
{/*       <div>
        {createField({type: 'text', placeholder: 'About me', name: 'aboutMe', component: Input, validators: []})}
        {createField({type: 'text', placeholder: 'Instagram', name: 'instagram', component: Input, validators: []})}
        {createField({type: 'text', placeholder: 'Looking for a job', name: 'lookingJob', component: Input, validators: []})}
        {createField({type: 'text', placeholder: 'GitHub', name: 'github', component: Input, validators: []})}
      </div>
      <Button type={'submit'} callback={props.deActivateEditMode} name={'Save'}/> */}

  </form>
  )
}

//оборачиваем форму контейнерной компонентой (HOC)
export const ProfileEditFormRedux = reduxForm<ProfileFormField, ProfileEditFormProps>({
  form: 'profile', //присваиваем уникальное название форме
})(ProfileEditForm)

