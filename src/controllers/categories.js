const Category = require('../models/Category');

module.exports = {
    async getCategories(page = 0, perPage = 20) {
        return await Category.query().page(page, perPage);
    },

    async getCategory(id) {
        return await Category.query().where({id: id});
    },

    async createCategory(query) {
        return await Category.query().insert(query);
    },

    async updateCategory(id, query) {
        return await Category.query().patchAndFetchById(id, query);
    },

    async deleteCategory(id) {
        return await Category.query().deleteById(id);
    }
}