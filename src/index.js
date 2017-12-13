import React from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import tweetReducer from './reducers/tweetReducer.js';
import userReducer from './reducers/userReducer.js';
import {LoginContainer} from './components/LoginContainer.js';
import {TweetContainer} from './components/TweetContainer.js';


const reducers = combineReducers({
  users: userReducer,
  tweets: tweetReducer,
})

const store = createStore(reducers);

const mapStateToProps = (state) => {
  return state
};

connect(mapStateToProps)(LoginContainer);

//ルーティング設定
var Routes = (
  <div>
    <Switch>
      <Route exact path='/' component={LoginContainer} />
      <Route path='/tweet' component={TweetContainer} />
    </Switch>
  </div>
);

//レンダリング
ReactDOM.render(
  <Provider>
    <BrowserRouter>
      {Routes}
    </BrowserRouter>
  </Provider>,
  document.getElementById('tweet')
);
