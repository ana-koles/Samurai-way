import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './Profile.module.css'

type ProfileStatusWithHooksPropsType = {
  status: string
  updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = (props: ProfileStatusWithHooksPropsType) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const onStatusChange = (e: ChangeEvent<HTMLTextAreaElement >) => {
    setStatus(e.currentTarget.value)
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status)
  }

  const activateEditMode = () => {
    setEditMode(true)
  }


  return (
    <div className={s.statusWrapper}>
      {editMode
      ?
      <textarea onChange={onStatusChange} autoFocus={true}
              onBlur={deactivateEditMode}
              value={status}/>
      :
      <span className={s.statusText} onDoubleClick={activateEditMode}>{status || 'Here should be my status'}</span>
      }
    </div>
  );
};
