'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThreadsSchema extends Schema {
  up () {
    this.create('threads', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.text('content').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('threads')
  }
}

module.exports = ThreadsSchema
