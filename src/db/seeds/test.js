
exports.seed = async function(knex) {
  await knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, login: 'Diana', email: 'diana@gmail.com'},
        {id: 2, login: 'Tylel', email: 't@mail.com'}
      ]);
    });
    await knex('forks').del()
    .then(function () {
      return knex('forks').insert([
        {id: 1, name: 'fork', userId: 2 },
        {id: 2, name: 'beautyFork', userId: 1 },
        {id: 3, name: 'rowValue3', userId: 2 }
      ]);
    });
    await knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {id: 1, name: 'silver'},
        {id: 2, name: 'gold'},
        {id: 3, name: 'wtf'}
      ]);
    });
    await knex('categoriesForks').del()
    .then(function () {
      return knex('categoriesForks').insert([
        {categoryId: 3, forkId: 2 },
        {categoryId: 3, forkId: 1 },
        {categoryId: 2, forkId: 3 },
        {categoryId: 3, forkId: 3 },
        {categoryId: 2, forkId: 2 },
        {categoryId: 1, forkId: 2 },
        {categoryId: 1, forkId: 1 },
        {categoryId: 1, forkId: 3 }
      ]);
    });

    return true;
};
