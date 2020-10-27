
exports.up = async function(knex) {
  return await knex.schema.createTable('users', t => {
      t.increments('id').primary;
      t.string('login').unique().notNullable();
      t.string('password');
      t.string('email').unique().notNullable();
  });
};

exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists('users');
};
