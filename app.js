//set up the server
const express = require( "express" );
const { send } = require("express/lib/response");
const logger = require( 'morgan' )
const app = express();
const port = 8080;
// Configure Express to use EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const db = require('./db/db_connection');

// Defining middleware that logs all incoming requests
app.use(logger('dev'));

// Define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    // res.sendFile( __dirname + "/views/index.html" );
    res.render('index');
} );

const read_passwords_all_sql = `
    SELECT
        site, acctname, password, security
    FROM
        passwords
`;

// define a route for the stuff inventory page
app.get( "/manage", ( req, res ) => {
    db.execute(read_passwords_all_sql, (error, results) => {
        if (error) res.status(500).send(error); // Internal Server Error
        else res.send(results);
    });
    // res.sendFile( __dirname + "/views/manager.html" );
} );

const read_passwords_item_sql = `
    SELECT
        site, acctname, password, security
    FROM
        passwords
    WHERE
        id = ?
`;

// define a route for the item detail page
app.get( "/manage/edit/:id", ( req, res ) => {
    db.execute(read_passwords_item_sql, [req.params.id], (error, results) => {
        if (error) res.status(500).send(error); // Internal Server Error
        else if (results.length == 0) res.status(404).send(`No item found with id = ${req.params.id}`);
        else {
            let data = results[0];
            res.render('item', data);
        };
    });
   // res.sendFile( __dirname + "/views/item.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );