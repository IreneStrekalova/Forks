const Model = require('../db/dbConnection');


module.exports = class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() { 
        const Fork = require('./Fork');
        const Category = require('./Category');
        return {
            forks: {
                modelClass: Fork,
                relation: Model.HasManyRelation,
                join: {
                    from: 'users.id',
                    to: 'forks.userId'
                }
            },
            categories: {
                modelClass: Category,
                relation: Model.ManyToManyRelation,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'usersCategories.userId',
                        to: 'usersCategories.categoryId'
                    },
                    to: 'categories.id'
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