
const db = require('./db_connection');

const table = 'passwords';

// delete the table if it already exists
const drop_pw_table_sql = 'DROP TABLE IF EXISTS `passwords`;'
db.execute(drop_pw_table_sql);

// create the table with suitable columns and such
const create_pw_table_sql = `
    CREATE TABLE webapp2122t3_parjai25.${table} (
        id INT NOT NULL AUTO_INCREMENT,
        site VARCHAR(50) NOT NULL,
        acctname VARCHAR(100) NOT NULL,
        password VARCHAR(150) NOT NULL,
        security VARCHAR(20) NOT NULL,
        PRIMARY KEY (id)
    );
`
db.execute(create_pw_table_sql);

// add some sample data to the table

const insert_pw_table_sql = `
    INSERT INTO ${table} 
        (site, acctname, password, security) 
    VALUES 
        (?, ?, ?, ?);
`

db.execute(insert_pw_table_sql, ['google.com', 'TKDPenguin', '**********', 'red Weak']);
db.execute(insert_pw_table_sql, ['bergen.org', 'jaccro25', '********', 'orange Okay']);
db.execute(insert_pw_table_sql, ['github.com', 'ParJai', '***************', 'green Strong']);

// read data from table

const read_pw_table_sql = `SELECT * FROM ${table}`;

db.execute(read_pw_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log(`Table '${table}' initialized with:`)
        console.log(results);
    }
);

db.end();
