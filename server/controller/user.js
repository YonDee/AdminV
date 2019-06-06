const db = require('../database/models')
const bcrypt = require('../plugins/bcrypt')
// session use follow
// const jwt = require('jsonwebtoken')
// const secret = 'wingca2016'

module.exports = {
  name: 'user',
  index: async (ctx) => {
    const res = await db.User.findAndCountAll()
    ctx.body = res
  },
  create: async (ctx) => {
    const user = ctx.request.body
    let res
    user.password = await bcrypt.enbcrypt(user.password)
    res = await db.User.create(user)
    ctx.status = 201
    return ctx.body = res.dataValues
  },
  is_unique: async (ctx) => {
    const req = ctx.request.body
    const isUnique = await db.User.findOne({where: req})
    if(isUnique){
      ctx.throw(403, 'Existing')
    }else{
      ctx.body="Available"
    }
  }
}
