const db = require("../../data/dbConfig");

module.exports = {
  add,
  findBy,
  findById
};

function findBy(filter) {
  return db("users").where(filter)
  .orderBy("id")
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users as u")
    .select("id", "username", "password")
    .where("u.id", id)
    .first();
}