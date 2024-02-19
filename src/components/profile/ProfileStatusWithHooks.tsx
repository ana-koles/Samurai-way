import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './Profile.module.css'

type ProfileStatusWithHooksPropsType = {
  status: string
  updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = (props: ProfileStatusWithHooksPropsType) => {
  console.log('component')

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    console.log('effect')
    setStatus(props.status)
  }, [props.status])

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div>
      <input onChange={onStatusChange} autoFocus={true}
              onBlur={deactivateEditMode}
              type="text" value={status}/>
    </div>
    :
    <div>
      <span onDoubleClick={activateEditMode}>{status || 'Here should be my status'}</span>
    </div>
    }


  </div>
  );
};
