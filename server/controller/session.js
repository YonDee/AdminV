const db = require('../database/models')
const bcrypt = require('../plugins/bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'wingca2016'
module.exports = {
  name: 'session',
  login: async (ctx) => {
    const user = ctx.request.body
    if(!user.account && !user.password){
      ctx.throw(403, 'Missing necessary fields.')
    }
    let res
    // 查询是否存在邮箱
    res = await db.User.findOne({
      where: {
        email: user.account
      }
    })
    if(!res){
      res = await db.User.findOne({
        where: {
          account: user.account
        }
      })
    }
    const is_true = await bcrypt.validate(user.password, res.dataValues.password)
    if (is_true) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: res.dataValues
      }, secret)
      ctx.cookies.set('token', token, {
        maxAge: 3600 * 1000,
        httpOnly: true
      })
      return ctx.body = res
    } else {
      ctx.throw(403, 'Incorrect username or password.')
    }
  },
  logout: async (ctx) => {
    ctx.cookies.set('token', '')
    return ctx.body = 'logout success'
  },
  verify: async (ctx) => {
    const token = ctx.cookies.get('token', {
      signed: false
    })
    const now = Date.parse(new Date()) / 1000
    const res = jwt.verify(token, secret)
    if ((now - res.iat) > (60 * 15)) { // Last 15 minute to update tokens and cookies
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: res.data
      }, secret)
      ctx.cookies.set('token', token, {
        maxAge: 3600 * 1000,
        httpOnly: true
      })
    }
    ctx.body = res
  }
}
