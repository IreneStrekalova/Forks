const Model = require('../db/dbConnection');

module.exports = class CategoryFork extends Model {
    static get tableName() {
        return 'categoriesForks';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'categoryId', 'forkId' ],
            properties: {
                id: { type: 'integer' },
                categoryId: { type: 'integer' },
                forkId: { type: 'integer' }
            }

        }
    }
}