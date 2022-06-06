//set up the server
const express = require( "express" );
const { send } = require("express/lib/response");
const logger = require( 'morgan' )
const app = express();
const port = process.env.PORT;

// Configure Express to use EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const db = require('./db/db_pool');

// Configure express to parse URL-encoded POST request bodies (traditional forms) 
app.use(express.urlencoded({extended : false}));

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
        id, site, acctname, password, security
    FROM
        passwords
`;

// define a route for the stuff inventory page
// app.get( "/manage", ( req, res ) => {
//     db.execute(read_passwords_all_sql, (error, results) => {
//         if (error) res.status(500).send(error); // Internal Server Error
//         else res.send(results);
//     });
//     // res.sendFile( __dirname + "/views/manager.html" );
// } );

const read_passwords_item_sql = `
    SELECT
        id, site, acctname, password, security
    FROM
        passwords
    WHERE
        id = ?
`;

// define a route for the manage page
app.get('/manage', ( req, res ) => {
    db.execute(read_passwords_all_sql, (error, results) => {
        if (error) res.status(500).send(error); // Internal Server Error
        else res.render('manage', {inventory : results});
        console.log(results)
        // inventory's shape:
        // [
        // {id: ___, item: ___, quantity: ___}
        // {id: ___, item: ___, quantity: ___}
        // {id: ___, item: ___, quantity: ___}
        // ]
    });
});

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

const delete_pw_sql =  `
    DELETE
    FROM
        passwords
    WHERE
        id = ?
`

app.get('/manage/edit/:id/delete', ( req, res ) => {
    db.execute(delete_pw_sql, [req.params.id], ( error, results ) => {
        if (error) res.status(500).send(error);
        else {res.redirect('/manage');};
    });
});

const create_pw_sql = `
    INSERT INTO passwords
        (site, acctname, password, security)
    VALUES
        (?, ?, ?, ?)
`;

app.post('/manage', ( req, res ) => {
   // to get the form input values:
   // req.body.site
   // req.body.acctname
   // req.body.pw
    db.execute(create_pw_sql, [req.body.site, req.body.acctname, req.body.pw, 'green Strong'], (error, results) => {
        if (error) res.status(500).send(error);
        else res.redirect(`/manage/edit/${results.insertId}`);
    });
});

const update_pw_sql = `
    UPDATE
        passwords
    SET
        site = ?,
        acctname = ?,
        password = ?,
        security = ?
    WHERE
        id = ?
`;

app.post('/manage/edit/:id', ( req, res ) => {
    db.execute(update_pw_sql, [req.body.site, req.body.acctname, req.body.pw, 'green Strong', req.params.id], ( error, results ) => {
        if (error) res.status(500).send(error);
        else res.redirect(`/manage/edit/${req.params.id}`);
    });
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );