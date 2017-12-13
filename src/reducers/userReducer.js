
const initialState = {
  users: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      return {
        users: state.users.concat(action.value)
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer
