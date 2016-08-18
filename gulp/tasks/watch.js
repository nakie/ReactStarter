var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch'], function() {
   gulp.watch( config.less.watch     , ['less'] );
   gulp.watch( config.js.src     , ['browserify'] );
  gulp.watch( config.markup.watch , ['markup'] );
});
