import React from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import tweetReducer from './reducers/tweetReducer.js';
import userReducer from './reducers/userReducer.js';
import LoginComponent from './components/LoginComponent.js';
import TweetComponent from './components/TweetComponent.js';

const reducers = combineReducers({
  userReducer,
  tweetReducer,
})

const store = createStore(reducers);

//ルーティング設定
let Routes = (
  <div>
    <Switch>
      <Route exact path='/' component={LoginComponent}/>
      <Route path='/tweet' component={TweetComponent}/>
    </Switch>
  </div>
);

//レンダリング
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {Routes}
    </BrowserRouter>
  </Provider>,
  document.getElementById('tweet')
);
