//set up the server
const express = require( "express" );
const logger = require( 'morgan' )
const app = express();
const port = 8080;

// Defining middleware that logs all incoming requests
app.use(logger('dev'));

// Define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the stuff inventory page
app.get( "/manage", ( req, res ) => {
    res.sendFile( __dirname + "/views/manager.html" );
} );

// define a route for the item detail page
app.get( "/manage/edit", ( req, res ) => {
    res.sendFile( __dirname + "/views/item.html" );
} );



app.get('/styles/structurestyles.css', (req, res) => {
    res.sendFile( __dirname + '/views/styles/structurestyles.css')
});

app.get('/styles/homestyles.css', (req, res) => {
    res.sendFile( __dirname + '/views/styles/homestyles.css')
});

app.get('/styles/structurestyles.css', (req, res) => {
    res.sendFile( __dirname + '/views/styles/structurestyles.css')
});

app.get('/images/lock-key.png', (req, res) => {
    res.sendFile( __dirname + '/views/images/lock-key.png')
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );