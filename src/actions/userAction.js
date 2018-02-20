const userActions = {
  initUser(users) {
    return {
      type: 'INIT_USER',
      payload: users
    }
  },
  addUser(payload) {
    return {
      type: 'ADD_USER',
      payload,
    }
  },
}

export default userActions
