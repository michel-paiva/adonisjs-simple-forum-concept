'use strict'

class StoreUser {
  get rules () {
    return {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed'
    }
  }
}

module.exports = StoreUser
