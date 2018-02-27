import React from 'react'

//登録ユーザーリスト
class UserList extends React.Component {
  render() {
    return (
      <div className='userItem'>
        <div className='user'>・{this.props.user.userName}</div>
      </div>
    )
  }
}

export default UserList
