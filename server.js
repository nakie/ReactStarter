// server.js
// load the things we need
var express = require( 'express' );
var fs = require('fs');

// init express app object.
var app = express();

// set the view engine to ejs
app.set( 'view engine', 'ejs' );

//use res.render to load up an ejs view file

// // index page
// app.get ( '/', function( req, res ){
//     
//     res.render( 'pages/index' );
//     
//     console.log( req )
// });
// 
// 
// // about page
// app.get( '/about', function ( req, res) {
//     
//     res.render( 'pages/about' );
// });

app.use( express.static( __dirname + '/public' ) );

// Catch all routing... 
app.get( '*', function( req, res ){    
    
    var parms = req.url.split( "/" );
        
    // Drop falsy values from array
    parms = parms.filter( Boolean );
    
    if ( parms.length >= 1 ){
        
        // if there is a page matching parm[0] lets load it 

        var path = 'views/pages/' + parms[0] + ".ejs";
        
        //console.log( path );
        
        //console.log( parms );
        fs.stat( path, function( err, statObj ){
            
            //console.log( err );
            //console.log( statObj );
            
            if( typeof(statObj) != "undefined" ){
                
                res.render( 'pages/' + parms[0] );
                
            } else {
                
                res.status( 404 );  // HTTP status 404: NotFound
                res.render( 'pages/404', { url: req.url } );
                return;
                
            }
            
        });
                
    } else {
        
        res.render( 'pages/contract' );
        
    }
    
});

app.listen( 8080 );
console.log( '8080 is the magic port' );