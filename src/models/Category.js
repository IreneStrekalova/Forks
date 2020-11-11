const Model = require('../db/dbConnection');

module.exports = class Category extends Model {
    static get tableName() {
         return 'categories';
    }

    static get relationMappings() {
        const Fork = require('./Fork');
        const User = require('./User');

        return {
            forks: {
                modelClass: Fork,
                relation: Model.ManyToManyRelation,
                join: {
                    from: 'categories.id',
                    through: {
                        from: 'categoriesForks.categoryId',
                        to: 'categoriesForks.forkId'
                    },
                    to: 'forks.id'
                }
            },
            users: {
                modelClass: User,
                relation: Model.ManyToManyRelation,
                join: {
                    from: 'categories.id',
                    through: {
                        from: 'usersCategories.categoryId',
                        to: 'usersCategories.userId'
                    },
                    to: 'users.id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'name' ],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minlength: 1, maxLength: 150 },
                description: { type: 'string', minlength: 1, maxLength: 255 }
            }

        }
    }
}