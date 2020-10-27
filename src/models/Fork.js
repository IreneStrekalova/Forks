const Model = require('../db/dbConnection');
const User = require('./User');
const Category = require('./Category');

module.exports = class Fork extends Model {
    static get tableName() {
        return 'forks';
    }

    static get relationMappings() {
        return {
            user: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'forks.userId',
                    to: 'users.id'
                }
            },
            categories: {
                modelClass: Category,
                relation: Model.ManyToManyRelation,
                join: {
                    from: 'forks.id',
                    through: {
                        from: 'categoriesForks.forkId',
                        to: 'categoriesForks.categoryId'
                    },
                    to: 'categories.id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'name', 'userId' ],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minlength: 1, maxLength: 150 },
                description: { type: 'string', minlength: 1, maxLength: 255 },
                creatingYear: { type: 'integer' },
                userId: { type: 'integer' }
            }

        }
    }
}