
const db = require('./db_connection');

endVar = 'solution'

db.execute(`SELECT 1 + 1 AS ${endVar}`,
    (error, results) => {
        if (error) throw error;
        console.log(results[0][`${endVar}`]);
    }
);

db.end(); // optional: close the connection after the query queue is empty
