'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Thread extends Model {
  comments () {
    return this.hasMany('App/Models/Comment')
  }

  author () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Thread
