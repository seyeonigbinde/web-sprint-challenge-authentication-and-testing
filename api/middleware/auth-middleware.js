const Users = require("../users/users-model")
const { findBy } = require("../users/users-model")

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
  const valid = Boolean(username && password);
  if (valid) {
    next();
  } else {
    res.status(422).json({
      message: "username and password required",
    });
  }
}

const checkUsernameExists = async (req, res, next) => {
    try {
      const [user] = await findBy({ username: req.body.username })
      if (!user) {
        next({ status: 401, message: "Invalid Credentials" })
      } 
      else {
        req.user = user
        next()
      }
    } catch (err) {
      next(err)
    }
  }

//   const checkPasswordExists = async (req, res, next) => {
//     try {
//       const [pwd] = await findBy({ password: req.body.password })
//       if (!pwd) {
//         next({ status: 401, message: `Invalid credentials` })
//       } else {
//         req.user = pwd
//         next()
//       }
//     } catch (err) {
//       next(err)
//     }
//   }

//   function checkPasswordExists (req, res, next) {
//     const error = { status: 401 }
//     const { password } = req.body
//     if (!password || !password.trim().length) {
//       error.message = 'Invalid credentials'
//     }
//       else {
//         next()
//     }
//   }

module.exports = {
   checkPayload,
    checkUsernameFree,
    checkUsernameExists,

  }
