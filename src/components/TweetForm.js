import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {tweetsRef} from '../firebase/index.js';

//送信フォーム
class TweetForm extends React.Component{
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }
  _onClick(e){
      this.props.tweet.push({
        userName: firebase.auth().currentUser.displayName,
        text: ReactDOM.findDOMNode(this.refs.inputValue).value
      });
      tweetsRef.set(this.props.tweet);
      ReactDOM.findDOMNode(this.refs.inputValue).value　='';
  }
  render(){
    return(
      <div className='tweetForm'>
        <input ref='inputValue' type='text' placeholder='message...' />
        <input type='button' value='送信' onClick={this._onClick.bind(this)}/>
      </div>
    );
  }
}

export default TweetForm
