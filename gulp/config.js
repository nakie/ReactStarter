var dest = './public';
var src  = './src';

module.exports = {
  less: {
    src:  src + '/less/style.less',
    watch:  src + '/less/**',
    dest: dest + '/css'
  },
  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest
  },
  js: {
    src: src + '/js/**',
    watch: src + '/js/**',
    dest: dest + '/js'
  },
  markup: {
    src: src + '/html/*.html',
    watch: src + '/html/**',
    dest: dest,
    swig_options: {
      defaults: {
        cache: false
      },
      json_path: src + '/data'
    }
  },
  browserify: {
    debug: true,
    extensions: ['.jsx'],
    bundleConfigs: [{
      entries: src + '/js/app.js',
      dest: dest + '/js/',
      outputName: 'app.js'
    }]
  }

};
