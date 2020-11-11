const Category = require('../models/Category');

module.exports = {
    async getCategories(page = 0, perPage = 20) {
        return await Category.query().page(page, perPage);
    },

    async getCategory(id, related) {
        let query = Category.query().where({id: id});
        if (related) {
            query = query.withGraphFetched(related);
        }
        return await query;
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