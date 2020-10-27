const Model = require('../db/dbConnection');
const Fork = require('./Fork');

module.exports = class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            forks: {
                modelClass: Fork,
                relation: Model.HasManyRelation,
                join: {
                    from: 'users.id',
                    to: 'forks.userId'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'login', 'email' ],
            properties: {
                id: { type: 'integer' },
                login: { type: 'string', minlength: 1, maxLength: 50 },
                password: { type: 'string', minlength: 1, maxLength: 255 },
                email: { type: 'string', minlength: 6, maxLength: 50 }
            }

        }
    }
}