var gulp = require( 'gulp' );
var shell = require( 'gulp-shell' );


// Start gulp Task runs server.js to fire up the webserver.
gulp.task( 'start', shell.task( "node server.js" ) );