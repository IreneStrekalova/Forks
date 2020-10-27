
exports.up = async function(knex) {
  return await knex.schema.createTable('categories', t => {
      t.increments('id').primary;
      t.string('name').notNullable();
      t.string('description');
  });
};

exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists('categories');
};
