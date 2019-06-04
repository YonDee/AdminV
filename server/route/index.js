const KoaRouter = require('koa-router')
var router = new KoaRouter()
const koaCompose = require('koa-compose')
const Controller = require('../controller')

module.exports = () => {
  // user routel
  router.post('/api/user/create', Controller.user.create)
  router.post('/api/user/checkAccount', Controller.user.checkAccount)
  // session routes
  router.post('/api/session/verify', Controller.session.verify)
  router.post('/api/session/login', Controller.session.login)
  router.post('/api/session/logout', Controller.session.logout)

  return koaCompose([router.routes(), router.allowedMethods()])
}
