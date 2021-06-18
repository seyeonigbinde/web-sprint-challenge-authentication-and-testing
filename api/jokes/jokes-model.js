const db = require("./jokes-data")

module.exports = {
 getAll
}

function getAll() {
  return db('jokes')
}