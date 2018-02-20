import React from 'react';
import firebase from 'firebase';
import {tweetsRef, usersRef} from '../firebase/index.js';
import tweetActions from "../actions/tweetAction";
import userActions from "../actions/userAction";

export class LoginContainer extends React.Component {
    //コンストラクタ
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tweets: [],
        };
    }

    //コンポーネントマウント時処理
    componentDidMount() {
        //DBからデータ読み込み
        tweetActions.initTweet()
        userActions.initUser()
        //ログイン状態監視オブザーバ設定
        firebase.auth().onAuthStateChanged((user) => {
            console.log('login status changed.')
            if (user) {
                this.props.history.push({
                    pathname: '/tweet',
                    state: this.state
                });
            } else {
                this.props.history.push('/');
            }
        });
    }

    //ユーザー登録
    _onClickSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var userName = document.getElementById('userName').value;

        //メールアドレスとパスワードでユーザー作成
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            this.props.handleUserAdd({
                userName: userName
            });
            usersRef.set(this.state.users);
            return user.updateProfile({
                displayName: document.getElementById('userName').value
            });
        }).catch(function (error) {
            alert(error);
        });
    }

    //ログイン処理
    _onClickLogin() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
            console.log('login')
        }).catch(function (error) {
            alert(error);
        });
    }

    //レンダリング
    render() {
        return (
            <div className='loginContainer'>
                <h1>LOGIN</h1>
                mail: <input id='email' type='text' placeholder='e-mail'/><br/>
                name: <input id='userName' type='text' placeholder='displayName'/><br/>
                pass: <input id='password' type='password' placeholder='password'/><br/>
                <button type="button" onClick={this._onClickLogin.bind(this)}>login</button>
                or <button type="button" onClick={this._onClickSignUp.bind(this)}>sign-up</button>
            </div>
        );
    }
}
