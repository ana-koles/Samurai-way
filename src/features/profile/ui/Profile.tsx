import React, { useState } from "react";
import s from "./Profile.module.css";
import { PostSectionContainer } from "./postSection/PostSectionContainer";
import {
  ContactsType,
  savePhotoTC,
  updateProfileTC,
  updateStatusTC,
} from "../modal/profile-reducer";
import { Preloader } from "../../../components/common/preloader/Preloader";
import noPhoto from "../../../assets/no_photo.jpg";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import { ProfileEditFormRedux } from "./ProfileEditForm";
import { ProfileData } from "./ProfileData";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getStatus } from "../modal/profile-selectors";

type ProfilePropsType = {
  isOwner: boolean;
};

type ProfileFormField = {
  aboutMe: string | null;
  lookingJob: boolean;
  lookingForAJobDescription: string | null;
} & ContactsType;

export const Profile = ({isOwner}: ProfilePropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const profile = useSelector(getProfile)

  const updateStatus = () => {
    dispatch(updateStatusTC(status))
  }

  const updateProfilePhotoHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length) {
      dispatch(savePhotoTC(e.target.files[0]))
    }
  };

  if (!profile) {
    return <Preloader />;
  }

  const onSubmit = async (data: ProfileFormField) => {
    const updatedProfileData = { ...profile, ...data };
    dispatch(updateProfileTC(updatedProfileData))
    setEditMode(false)
  };

  return (
    <div className={s.content}>
      <div className={s.profileWrapper}>
        <div className={s.contentWrapper}>
          <div className={s.profilePhotoWrapper}>
            {profile.photos.large !== null ? (
              <img
                className={s.photo}
                src={profile.photos.large}
                alt="Profile"
              />
            ) : (
              <img className={s.photo} src={noPhoto} alt="No" />
            )}

            {isOwner && (
              <input
                className={s.photoInput}
                type="file"
                name="Photo"
                id="photo"
                onChange={updateProfilePhotoHandler}
              />
            )}
          </div>

          <div className={s.info_wrapper}>
            <h2>{profile.fullName}</h2>
            <ProfileStatusWithHooks
              status={status}
              updateStatus={updateStatus}
            />

            {editMode ? (
              <ProfileEditFormRedux
                initialValues={profile}
                onSubmit={onSubmit}
                profile={profile}
                isOwner={isOwner}
              />
            ) : (
              <ProfileData
                activateEditMode={() => setEditMode(true)}
                isOwner={isOwner}
                profile={profile}
              />
            )}
          </div>
        </div>
      </div>

      <PostSectionContainer />
    </div>
  );
};
