
exports.up = async function(knex) {
  return await knex.schema.createTable('forks', t => {
      t.increments('id').primary;
      t.string('name').notNullable();
      t.string('description');
      t.integer('creatingYear');
      t.integer('userId').notNullable();
  });
};

exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists('forks');
};
