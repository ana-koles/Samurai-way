import React, { useState } from 'react';
import s from './Profile.module.css'
import { PostSectionContainer } from './postSection/PostSectionContainer';
import { UserProfileType } from '../../redux/profile-reducer';
import { Preloader } from '../common/Preloader';
import noPhoto from '../../assets/no_photo.jpg'
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';
import { ProfileEditFormRedux } from './ProfileEditForm';
import { ProfileData } from './ProfileData';

type ProfilePropsType = {
  profile: UserProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
}

type  ProfileFormField = {
  aboutMe: string | null
  instagram: string | null
  lookingJob: boolean
  github: string | null
}

export const Profile = ({profile, status, updateStatus, isOwner, savePhoto}: ProfilePropsType) => {

  const [editMode, setEditMode] = useState<boolean>(false)

  const updateProfilePhotoHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  if (!profile ) {
    return (<Preloader/>)
  }

  const onSubmit = (data: ProfileFormField) => {
  }

  return (
    <div className={s.content}>
        <div className={s.profile_wrapper}>
          <div className ={s.content_wrapper}>
          <div className={s.profilePhotoWrapper}>

          <div className={s.photoCover}>
          {profile.photos.large !== null
          ?
          <img className={s.photo} src={profile.photos.large} alt="Profile" />
          :
          <img className={s.photo} src={noPhoto} alt="No Profile" />
          }

          </div>

            {isOwner &&
              <input className={s.photoInput} type='file' name='Photo' id='photo' onChange={updateProfilePhotoHandler}/>
            }
            </div>
            <div className={s.info_wrapper}>
              <h2>{profile.fullName}</h2>
              <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

              {editMode ? <ProfileEditFormRedux onSubmit={onSubmit} profile={profile} isOwner={isOwner}/> : <ProfileData activateEditMode={() => setEditMode(true)} isOwner={isOwner} profile={profile}/> }

            </div>
          </div>
        </div>

        <PostSectionContainer/>
    </div>
  );
};


