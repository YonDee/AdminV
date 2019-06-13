const db = require('../database/models')
const bcrypt = require('../plugins/bcrypt')

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
  update: async (ctx) => {
    const req = ctx.request.body
    const res = await db.User.findByPk(req.id)
    let updateData = {}
    if (req.password) {
      updateData.password = await bcrypt.enbcrypt(req.password)
    }
    updateData.name = req.name
    updateData.id = req.id
    await res.update(updateData)
    ctx.body = { type: 'success' }
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
