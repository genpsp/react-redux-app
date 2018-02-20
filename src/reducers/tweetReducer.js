const initialState = {
  tweets: [],
}

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TWEET': {
      return {
        ...state,
        tweets: action.payload,
      }
    }
    case 'ADD_TWEET': {
      return {
        ...state,
        tweets: state.tweets.concat([action.payload])
      }
    }
    default: {
      return state
    }
  }
}

export default tweetReducer
