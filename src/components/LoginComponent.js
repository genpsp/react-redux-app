import React from 'react'
import firebase from 'firebase'
import {tweetsRef, usersRef} from '../firebase/index.js'
import tweetActions from "../actions/tweetAction"
import userActions from "../actions/userAction"
import {connect} from "react-redux"

class LoginComponent extends React.Component {
  //コンポーネントマウント時処理
  componentDidMount() {
    firebase.auth().signOut()
    //DBからデータ読み込み
    usersRef.once('value', (snapshot) => {
      if (snapshot.val()) {
        this.props.initUser(snapshot.val())
      }
    })
    tweetsRef.once('value', (snapshot) => {
      if (snapshot.val()) {
        this.props.initTweet(snapshot.val())
      }
    })
    //ログイン状態監視オブザーバ設定
    firebase.auth().onAuthStateChanged((user) => {
      console.log('login status changed.')
      if (user) {
        this.props.history.push({
          pathname: '/tweet',
          state: this.state
        })
      } else {
        this.props.history.push('/')
      }
    })
  }


  //ユーザー登録
  _onClickSignUp() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let userName = document.getElementById('userName').value

    //メールアドレスとパスワードでユーザー作成
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      this.props.handleUserAdd({
        userName: userName
      })
      usersRef.set(this.props.state.userReducer.users)
      return user.updateProfile({
        displayName: document.getElementById('userName').value
      })
    }).catch(function (error) {
      alert(error)
    })
  }

  //ログイン処理
  _onClickLogin() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    console.log(this.props.state)

    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      console.log('login')
    }).catch(function (error) {
      alert(error)
    })
  }

  //レンダリング
  render() {
    return (
      <div className='loginContainer'>
        <h1>LOGIN</h1>
        mail: <input id='email' type='text' placeholder='e-mail'/><br/>
        name: <input id='userName' type='text' placeholder='displayName'/><br/>
        pass: <input id='password' type='password' placeholder='password'/><br/>
        <button type="button" onClick={() => {
          this._onClickLogin()
        }}>login
        </button>
        or <button type="button" onClick={() => {
        this._onClickSignUp()
      }}>sign-up</button>
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
    initTweet: (tweet) => {
      dispatch(tweetActions.initTweet(tweet))
    },
    initUser: (users) => {
      dispatch(userActions.initUser(users))
    },
    handleUserAdd: (user) => {
      dispatch(userActions.addUser(user))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)