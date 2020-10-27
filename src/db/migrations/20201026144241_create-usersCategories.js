
exports.up = async function(knex) {
    return await knex.schema.createTable('usersCategories', t => {
        t.increments('id').primary;
        t.integer('userId').notNullable();
        t.integer('categoryId').notNullable();
    });
  };
  
  exports.down = async function(knex) {
    return await knex.shema.dropTableIfExist('usersCategories');
  };
