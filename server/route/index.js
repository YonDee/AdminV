const KoaRouter = require('koa-router')
var router = new KoaRouter()
const koaCompose = require('koa-compose')
const Controller = require('../controller')

module.exports = () => {
  router.get('/api/session/index', Controller.session.index)

  return koaCompose([router.routes(), router.allowedMethods()])
}
