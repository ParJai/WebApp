
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    // host: 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
    host: process.env.DB_HOST || 'localhost',
    // port: 3306,
    port: parseInt(process.env.DB_PORT || 3306),
    // user: 'parjai25',
    user: process.env.DB_USER,
    // password: 'd996uc6qw8xc',
    password: process.env.DB_PASSWORD,
    // database: 'webapp2122t3_parjai25',
    database: process.env.DB_DATABASE,
    // connectTimeout: 10000
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || 10000),
};

const connectionPool = mysql.createPool(dbConfig);

module.exports = connectionPool;
