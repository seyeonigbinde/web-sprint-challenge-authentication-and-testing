const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const User = require('../users/users-model.js')
const { JWT_SECRET } = require("../secrets/index")
const { checkUsernameFree, checkPayload,
  checkUsernameExists,
}= require('../middleware/auth-middleware.js')


router.post('/register', checkPayload, checkUsernameFree, (req, res, next) => {

  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  User.add({ username, password: hash })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(next);
})

router.post('/login', checkPayload, checkUsernameExists, (req, res, next) => {

  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = tokenBuilder(req.user);
    console.log(token)
    res.status(200).json({
      message: `welcome ${req.user.username}`,
      token
    });
  } else {
    next({ status: 401, message: "Invalid Credentials" });
  }
})

function tokenBuilder(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(
    payload,
    JWT_SECRET,
    options
  )
}

module.exports = router
