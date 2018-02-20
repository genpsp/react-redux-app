import React from 'react'
import firebase from 'firebase'
import UserList from '../components/UserList.js'
import TweetForm from '../components/TweetForm.js'
import {connect} from "react-redux"
import {tweetsRef} from "../firebase";

// メインツイート画面
export class TweetComponent extends React.Component {
  _onClickLogOut() {
    firebase.auth().signOut()
    console.log('logout')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        tweetsRef.set(this.props.state.tweetReducer.tweets)
        this.props.history.push('/')
      }
    })
  }

  render() {
    let {tweetReducer, userReducer} = this.props.state
    console.log(this.props.state)
    let tweetItems = tweetReducer.tweets.map((tweet) => {
      return (
        <TweetItem tweet={tweet}/>
      )
    })
    let userList = []
    if (userReducer.users) {
      userList = userReducer.users.map((user) => {
        return (
          <UserList user={user}/>
        )
      })
    }

    return (
      <div className='mainContainer clearfix'>
        <div className='tweetContainer'>
          <h1>Tweet Room</h1>
          <hr/>
          {tweetItems}
          <hr/>
          <TweetForm tweet={tweetReducer.tweets}/>
          <button className='logout' onClick={this._onClickLogOut.bind(this)}>logout</button>
        </div>
        <div className='userListContainer'>
          <h2>Users</h2>
          {userList}
        </div>
      </div>
    )
  }
}

//ツイートアイテム
class TweetItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='tweetItem'>
        <div className='tweet'>{this.props.tweet.userName}> {this.props.tweet.text}</div>
      </div>
    )
  }
}

//connect
export const mapStateToProps = (state) => {
  return {
    state: state
  }
}
export const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(TweetComponent)