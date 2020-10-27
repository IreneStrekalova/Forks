const { Model } = require('objection');
const knex = require('knex');
const config = require('../../knexfile')[process.env.NODE_ENV || 'development'];
const connection = knex(config);
Model.knex(connection);

module.exports = Model;