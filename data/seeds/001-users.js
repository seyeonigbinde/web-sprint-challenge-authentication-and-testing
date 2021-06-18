
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { username: 'Captain Marvel', password: 'foobar' },
        { username: 'Marvel', password: 'foo' },
        { username: 'Captain', password: 'bar' },
      ]);
    });
};