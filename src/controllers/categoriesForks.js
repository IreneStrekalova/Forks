const CategoryFork = require('../models/CategoryFork');
const Category = require('../models/Category');
//const sendMail = require('../helpers/sendMail');

module.exports = {
    async getCategoriesForks(page = 0, perPage = 20) {
        return await CategoryFork.query().page(page, perPage);
    },

    async getCategoryFork(id) {
        return await CategoryFork.query().where({id: id});
    },

    async createCategoryFork(query) {
        const relation = await CategoryFork.query().insert(query);
        const users = await Category.relatedQuery('users').for(query.categoryId);
//        sendMail(users);
        return {relation: relation, users: users};
    },

    async updateCategoryFork(id, query) {
        return await CategoryFork.query().patchAndFetchById(id, query);
    },

    async deleteCategoryFork(id) {
        return await CategoryFork.query().deleteById(id);
    }
}