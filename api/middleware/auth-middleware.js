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

function checkPayload(req, res, next) {
  const { username, password } = req.body;
  const valid = Boolean(username && password );
  if (valid) {
    next();
  } else {
    res.status(422).json({
      message: 'Please provide username and password',
    });
  }
}

module.exports = {
   checkPayload,
    checkUsernameFree
  }
