const Model = require('../db/dbConnection');

module.exports = class UserCategory extends Model {
    static get tableName() {
        return 'usersCategories';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'userId', 'categoryId' ],
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
                categoryId: { type: 'integer' }
            }

        }
    }
}