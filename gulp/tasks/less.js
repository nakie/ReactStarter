var gulp 	= require( 'gulp' );
var gutil 	= require( 'gulp-util' );
var plugins = require( 'gulp-load-plugins' )();
var config       = require( '../config' ).less;


gulp.task( 'less', function() {
	return gulp.src( config.src )
        .pipe( plugins.sourcemaps.init() )
		.pipe( plugins.less() )
		.on( 'error', function ( err ) {
            gutil.beep();
            gutil.log( err );

            this.emit( 'end' );
        })
		.pipe( plugins.autoprefixer( {
			browsers: [
				'> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
			],
			cascade: false
		}))
        .pipe( plugins.sourcemaps.write() )
        //.pipe( plugins.cssmin() )     
		.pipe( gulp.dest( config.dest ) );
});