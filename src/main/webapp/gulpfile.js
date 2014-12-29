var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  stylish = require('jshint-stylish');

var paths = {
  app: {
    jsFiles: ['app/**/*.js', '!app/app_example.js']
  },
  target: 'build'
};

gulp.task('build-js', [], function (done) {
  gulp.src(paths.app.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      filename: __dirname + '/jshint-output.log'
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js', {newLine: ';\n'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.target))
    .on('end', done);
});


gulp.task('default', ['build-js']);