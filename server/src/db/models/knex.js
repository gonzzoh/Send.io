// Don't touch this file! It's used by knex to connect to the database.
// import it into any model that wants to talk to the DB
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../../../knexfile')[env];
module.exports = require('knex')(config);