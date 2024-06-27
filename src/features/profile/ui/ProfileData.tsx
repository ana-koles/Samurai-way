import { ContactsType, UserProfileType } from "../modal/profile-reducer";
import { Button } from "../../../components/button/Button";
import s from './Profile.module.css'

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

      {isOwner && <Button callback={activateEditMode} name={"edit"} />}
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
