'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class RequestExtensionProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Request = use('Adonis/Src/Request')

    Request.macro('origin',function(){
      return this.header('Referer').split('/').filter(function(item,index){
        return index >= 3
      }).join('/') || ''
    })
  }
}

module.exports = RequestExtensionProvider
