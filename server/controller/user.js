const db = require('../database/models')
const bcrypt = require('../plugins/bcrypt')
// session use follow
// const jwt = require('jsonwebtoken')
// const secret = 'wingca2016'

module.exports = {
  name: 'user',
  create: async (ctx) => {
    const user = ctx.request.body
    let res
    user.password = await bcrypt.enbcrypt(user.password)
    res = await db.User.create(user)
    ctx.status = 201
    return ctx.body = res.dataValues
  },
  account_is_unique: async (ctx) => {
    const req = ctx.request.body
    const hadUser = await db.User.findOne({
      where: {
        account: req.account
      }
    })
    if(hadUser){
      ctx.throw(403, 'Existing user.')
    }else{
      ctx.body="[type: 'success']"
    }
  },
  email_is_unique: async (ctx) => {
    const req = ctx.request.body
    const hadUser = await db.User.findOne({
      where: {
        account: req.account
      }
    })
    if(hadUser){
      ctx.throw(403, 'Existing user.')
    }else{
      ctx.body="[type: 'success']"
    }
  }
}
