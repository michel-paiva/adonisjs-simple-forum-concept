'use strict'

class LoginUser {
  get rules () {
    return {
      'email': 'required|email|exists:users,email',
      'password': 'required'
    }
  }
}

module.exports = LoginUser
