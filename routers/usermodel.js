const db = require('../data/dbconfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('user').select('id', 'username', 'password', 'isAdmin', 'country_id');
}

function findBy(filter) {
  const user = db('user').where(filter);
  return user;
}

async function add(user) {
  const [id] = await db('user').insert(user);
  return findById(id);
}

function findById(id) {
  return db('user')
    .where({ id })
    .first();
}

