import React, { useState } from 'react';
import s from './Profile.module.css'

type ProfileStatusWithHooksPropsType = {
  status: string
  updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = (props: ProfileStatusWithHooksPropsType) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState('');

  const onStatusChange = () => {

  }

  const deactivateEditMode = () => {

  }

  const activateEditMode = () => {

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
