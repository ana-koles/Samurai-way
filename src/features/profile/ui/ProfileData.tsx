import { Button } from "antd";
import { ContactsType, UserProfileType } from "../modal/profile-reducer";
import s from './Profile.module.css'
import sButton from '../../../components/button/Button.module.css'

type ProfileDataProps = {
  profile: UserProfileType;
  isOwner: boolean;
  activateEditMode: () => void;
};

export const ProfileData = ({
  profile,
  isOwner,
  activateEditMode,
}: ProfileDataProps) => {

  return (
    <div className={s.profileDataWrapper}>
      <p>About me: {profile.aboutMe}</p>
      <p>Looking for a job: {profile.lookingForAJob}</p>
      <p>My professional skills: {profile.lookingForAJobDescription}</p>

      {Object.keys(profile.contacts).map((key) => {
        let value = profile.contacts[key as keyof ContactsType];
        if(value) {
          return <Contact key={key} contactName={key} contactValue={value} />;
        }
      })}

      {/* {isOwner && <Button callback={activateEditMode} name={"edit"} />} */}
      {isOwner && <Button onClick={activateEditMode} className={sButton['button-antd']} type="primary">edit</Button>}
    </div>
  );
};

type ContactProps = {
  contactName: string;
  contactValue?: string | null;
};

export const Contact = ({ contactName, contactValue }: ContactProps) => {
  return (
    <p>
      {contactName}: {contactValue}
    </p>
  );
};
