import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { firebaseRef, tweetsRef, usersRef } from '../firebase/index.js';
import UserList from '../components/UserList.js';
import TweetForm from '../components/TweetForm.js';

// メインツイート画面
export class TweetContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = props.location.state;
    usersRef.set(this.state.users);
  }
  componentDidMount(){
    usersRef.on('value', (snapshot)　=> {
      this.setState({
        users: snapshot.val()
      });
    });
  }
  _onClickLogOut(){
    firebase.auth().signOut();
    console.log('logout');
    firebase.auth().onAuthStateChanged( (user) => {
      if(user){

      }else{
        this.props.history.push('/');
      }
    });
  }
  render(){
    var tweetItems = this.state.tweets.map((tweet) => {
      return (
        <TweetItem tweet={tweet} />
      );
    });
    var userList = this.state.users.map((user) => {
      return (
        <UserList user={user} />
      );
    });
    return(
      <div className='mainContainer clearfix'>
        <div className='tweetContainer'>
          <h1>Tweet Room</h1><hr />
          {tweetItems}
          <hr />
          <TweetForm tweet={this.state.tweets}/>
          <button className='logout' onClick={this._onClickLogOut.bind(this)}>logout</button>
        </div>
        <div className='userListContainer'>
          <h2>Users</h2>
          {userList}
        </div>
      </div>
    );
  }
}

//ツイートアイテム
class TweetItem extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className='tweetItem'>
        <div className='tweet'>{this.props.tweet.userName}> {this.props.tweet.text}</div>
      </div>
    );
  }
}
