import React from "react";
import s from './Profile.module.css'

type ProfileStatusPropsType = {
  status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

  state = {
    editMode: false
  }

  activateEditMode() {

    this.setState({
      editMode: true
    })
  }

  deactivateEditMode() {
    this.setState({
      editMode: false
    })
  }

  render() {
    return (
      <div className={s.statusWrapper}>
        {this.state.editMode
        ?
        <div>
          <input onBlur={this.deactivateEditMode.bind(this)} type="text" value={this.props.status}/>
        </div>
        :
        <div>
          <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
        </div>
        }


      </div>
    )
  }
}