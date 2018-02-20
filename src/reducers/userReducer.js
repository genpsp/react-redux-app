const initialState = {
    users: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USER': {
            return {
                ...state,
                users: action.payload
            }
        }
        case 'ADD_USER': {
            return {
                ...state,
                users: state.users.concat([action.payload]),
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer
