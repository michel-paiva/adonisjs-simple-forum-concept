'use strict'

class StoreThread {
  get rules () {
    return {
      title: 'required|max:200',
      content: 'required|min:20'
    }
  }
}

module.exports = StoreThread
