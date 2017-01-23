var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify=require('watchify');

gulp.task('bundle', function() {
  return browserify('src/App.js')
    .transform('babelify', {presets: 'react'})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('static/'));
});

gulp.task('watch', function() {

  var b = browserify({
    entries: ['src/App.js'],
    cache: {}, packageCache: {},
    plugin: ['watchify']
  });

  b.on('update', makeBundle);

  function makeBundle() {
    b.transform('babelify', {presets: 'react'})
      .bundle()
      .on('error',function(error){
        console.error(error.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('static/'));
      console.log('bundle updated');
  }

  // we have to call bundle once to kick it off.
  makeBundle();

  return b;
});

gulp.task('default',['watch']);