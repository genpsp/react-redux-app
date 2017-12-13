import React from 'react';
import firebase from 'firebase';
import { firebaseRef, tweetsRef, usersRef } from '../firebase/index.js';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount(){
    usersRef.once('value', (snapshot)　=> {
      this.setState({
        users: snapshot.val()
      });
    });
    console.log('DBからユーザーを取得');
  }
  //ユーザー登録
  _onClickSignUp(e){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var userName = document.getElementById('userName').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      this.state.users.push({
        userName: userName
      });
      usersRef.set(this.state.users);
      return user.updateProfile({
        displayName: document.getElementById('userName').value
      });
    }).catch(function(error){
      alert(error);
    });
    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        var currentUser = firebase.auth().currentUser;
        console.log(currentUser);
        console.log('signup!');
        this.props.history.push({
          pathname: '/tweet',
          state: {
            tweets: [],
            users: this.state.users
          }
        });
      }else{
        this.props.history.push('/');
      }
    });
  }
  //ログイン
  _onClickLogin(e){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
      alert(error);
    });
    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        console.log('signin!');
        this.props.history.push({
          pathname: '/tweet',
          state: {
            tweets: [],
            users: this.state.users
          }
        });
      }else{
        this.props.history.push('/');
      }
    });
  }
  render(){
    return(
      <div className='loginContainer'>
        <h1>LOGIN</h1>
        mail:	<input id='email' type='text' placeholder='e-mail' /><br />
        name:	<input id='userName' type='text' placeholder='displayName' /><br />
        pass:	<input id='password' type='password' placeholder='password' /><br />
        <button type="button" onClick={this._onClickLogin.bind(this)}>login</button> or <button type="button" onClick={this._onClickSignUp.bind(this)}>sign-up</button>
      </div>
    );
  }
}
