const KoaRouter = require('koa-router')
var router = new KoaRouter()
const koaCompose = require('koa-compose')
const Controller = require('../controller')

module.exports = () => {
  router.get('/api/index', Controller.index)

  return koaCompose([router.routes(), router.allowedMethods()])
}
