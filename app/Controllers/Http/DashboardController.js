'use strict'

const Thread = use('App/Models/Thread')

class DashboardController {
  async index ({ auth, request, response, view }) {
    let data = {}

    const trending = await Thread
      .query()
      .withCount('comments')
      .orderBy('comments_count','desc')
      .limit(10)
      .fetch()

    data = Object.assign({},{ trending: trending.toJSON() })

    if(!auth.user){
      const newer = await Thread
        .query()
        .withCount('comments')
        .orderBy('created_at','desc')
        .limit(10)
        .fetch()

      data = Object.assign({},{...data},{newer: newer.toJSON()})
    }

    if(auth.user){
      const mine = await Thread
        .query()
        .withCount('comments')
        .where('user_id', auth.user.id)
        .orderBy('created_at','desc')
        .limit(10)
        .fetch()

        data = Object.assign({},{...data},{mine: mine.toJSON()})
    }

    return view.render('partials.general.dashboard', data)
  }
}

module.exports = DashboardController
