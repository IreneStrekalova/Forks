const UserCategory = require('../models/UserCategory');

module.exports = {
    async getUsersCategories(page = 0, perPage = 20) {
        return await UserCategory.query().page(page, perPage);
    },

    async getUserCategory(id) { 
        return await UserCategory.query().where({id: id});
    },

    async createUserCategory(query) {
        return await UserCategory.query().insert(query);
    },

    async updateUserCategory(id, query) {
        return await UserCategory.query().patchAndFetchById(id, query).debug();
    },

    async deleteUserCategory(id) {
            return await UserCategory.query().deleteById(id);
    }
}