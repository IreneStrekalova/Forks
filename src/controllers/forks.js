const Fork = require('../models/Fork');

module.exports = {
    async getForks(page = 0, perPage = 20) {
        return await Fork.query().page(page, perPage);
    },

    async getFork(id) {
        return await Fork.query().where({id: id});
    },

    async createFork(query) {
        return await Fork.query().insert(query);
    },

    async updateFork(id, query) {
        return await Fork.query().patchAndFetchById(id, query);
    },

    async deleteFork(id) {
            return await Fork.query().deleteById(id);
    }
}