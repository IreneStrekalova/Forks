
exports.up = async function(knex) {
  return await knex.schema.createTable('categoriesForks', t => {
      t.increments('id').primary;
      t.integer('categoryId').notNullable();
      t.integer('forkId').notNullable();
  });
};

exports.down = async function(knex) {
  return await knex.shema.dropTableIfExist('categoriesForks');
};