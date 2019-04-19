'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/','DashboardController.index')

Route.resource('/users','UserController')
  .except(['destroy'])
  .validator(new Map([[['store'], ['StoreUser']]]))

Route.resource('/threads', 'ThreadController')
  .except(['destroy'])
  .middleware(new Map([[['store','create'], ['auth']],[['index'], ['pagination']]]))
  .validator(new Map([[['store'], ['StoreThread']]]))

Route.resource('/comments', 'CommentController')
  .except(['destroy'])
  .middleware(['auth'])
  .validator(new Map([[['store'], ['StoreComment']]]))

Route.post('/login', 'UserController.login')
  .validator('LoginUser')

Route.post('/logout', 'UserController.logout')
