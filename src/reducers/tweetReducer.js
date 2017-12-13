
const initialState = {
  tweets: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TWEET': {
      return {
        twees: state.tweets.concat(action.value)
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer
