'use strict'

const Thread = use('App/Models/Thread')
const NotFoundException = use('App/Exceptions/NotFoundException')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with threads
 */
class ThreadController {
  /**
   * Show a list of all threads.
   * GET threads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, pagination }) {
    const threads = await Thread
      .query()
      .withCount('comments')
      .orderBy('created_at','desc')
      .paginate(pagination.page, pagination.per_page)

    const { data, ...currenPagination } = threads.toJSON()

    return view.render('partials.thread.list', { threads: data, pagination: currenPagination })
  }

  /**
   * Render a form to be used for creating a new thread.
   * GET threads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('partials.thread.create')
  }

  /**
   * Create/save a new thread.
   * POST threads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const newThreadDataRequest = request.only(['title', 'content'])
    const newThreadData = Object.assign({},{...newThreadDataRequest, user_id: auth.user.id})

    const newThread = await Thread.create(newThreadData)

    response.redirect(`/threads/${newThread.id}`)
  }

  /**
   * Display a single thread.
   * GET threads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const thread = await Thread.find(params.id)

    if(!thread){
      throw new NotFoundException('Thread not found',404,'THREAD_NOT_FOUND')
    }

    await thread.loadMany(['author','comments', 'comments.author'])

    if(!thread){
      return view.render('partials.thread.notfound')
    }

    return view.render('partials.thread.show',{ thread: thread.toJSON() })
  }

  /**
   * Render a form to update an existing thread.
   * GET threads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update thread details.
   * PUT or PATCH threads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a thread with id.
   * DELETE threads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ThreadController
