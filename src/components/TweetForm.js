import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import {tweetsRef} from '../firebase/index.js'
import tweetActions from '../actions/tweetAction.js'
import userActions from '../actions/userAction.js'
import {connect} from 'react-redux'

//送信フォーム
class TweetForm extends React.Component {
  _onClick() {
    this.props.handleTweetAdd({
      text: ReactDOM.findDOMNode(this.refs.inputValue).value,
      userName: firebase.auth().currentUser.displayName,
    })
    ReactDOM.findDOMNode(this.refs.inputValue).value = ''
  }

  render() {
    return (
      <div className='tweetForm'>
        <input ref='inputValue' type='text' placeholder='message...'/>
        <input type='button' value='送信' onClick={() => {
          this._onClick()
        }}/>
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
  return {
    handleUserAdd(payload) {
      dispatch(userActions.addUser(payload))
    },
    handleTweetAdd(payload) {
      dispatch(tweetActions.addTweet(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TweetForm)
