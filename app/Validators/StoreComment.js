'use strict'

class StoreComment {
  get rules () {
    return {
      thread_id: 'required|integer',
      content: 'required|min:20'
    }
  }
}

module.exports = StoreComment
