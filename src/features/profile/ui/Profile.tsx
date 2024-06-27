import React, { useState } from "react";
import s from "./Profile.module.css";
import { PostSectionContainer } from "./postSection/PostSectionContainer";
import {
  ContactsType,
  UserProfileType,
  UserUpdatedProfileType,
} from "../modal/profile-reducer";
import { Preloader } from "../../../components/common/preloader/Preloader";
import noPhoto from "../../../assets/no_photo.jpg";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import { ProfileEditFormRedux } from "./ProfileEditForm";
import { ProfileData } from "./ProfileData";

type ProfilePropsType = {
  profile: UserProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveUpdatedData: (data: UserUpdatedProfileType) => Promise<void>;
  updateStatusSuccessful: boolean;
};

type ProfileFormField = {
  aboutMe: string | null;
  lookingJob: boolean;
  lookingForAJobDescription: string | null;
} & ContactsType;

export const Profile = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveUpdatedData,
}: ProfilePropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const updateProfilePhotoHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  if (!profile) {
    return <Preloader />;
  }

  const onSubmit = async (data: ProfileFormField) => {
    const updatedProfileData = { ...profile, ...data };
    saveUpdatedData(updatedProfileData);
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
              <img className={s.photo} src={noPhoto} alt="No Profile" />
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
