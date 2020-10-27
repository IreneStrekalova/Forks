const CategoryFork = require('../models/CategoryFork');

module.exports = {
    async getCategoriesForks(page = 0, perPage = 20) {
        return await CategoryFork.query().page(page, perPage);
    },

    async getCategoryFork(id) {
        return await CategoryFork.query().where({id: id});
    },

    async createCategoryFork(query) {
        return await CategoryFork.query().insert(query);
    },

    async updateCategoryFork(id, query) {
        return await CategoryFork.query().patchAndFetchById(id, query);
    },

    async deleteCategoryFork(id) {
        return await CategoryFork.query().deleteById(id);
    }
}