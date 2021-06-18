const Users = require("../users/users-model")

async function checkUsernameFree(req, res, next) {
    try {
      const existing = await Users
        .findBy({ username: req.body.username })
      if (!existing.length) {
        next()
      } else {
        next({ "message": "Username taken" })
      }
    } catch (err) {
      next(err)
    }
  }


module.exports = {
   
    checkUsernameFree
  }