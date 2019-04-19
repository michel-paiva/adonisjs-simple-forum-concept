'use strict'

const View = use('View')
const moment = require('moment')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ViewGlobal {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    View.global('dateformat',function (date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    })
    View.global('rawcontent',function (content) {
      return this.safe(content)
    })
    View.global('truncate',function (string, size, end) {
      return string.length > size ? `${string.substring(0,size)}${end}` : string
    })
    View.global('arrayrange', function(initial, final){
      return new Array(final-initial+1).fill().map(function(_, i){
        return i + initial
      })
    })
    await next()
  }
}

module.exports = ViewGlobal
