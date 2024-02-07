import React, { ChangeEvent } from "react";
import s from './Profile.module.css'

type ProfileStatusPropsType = {
  status: string
  updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{editMode: false, status: string}>): void {

    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }

  }

  render() {
    return (
      <div className={s.statusWrapper}>
        {this.state.editMode
        ?
        <div>
          <input onChange={this.onStatusChange} autoFocus={true}
                  onBlur={this.deactivateEditMode}
                  type="text" value={this.state.status}/>
        </div>
        :
        <div>
          <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Here should be my status'}</span>
        </div>
        }


      </div>
    )
  }
}