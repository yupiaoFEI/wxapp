var gulp = require('gulp'),
  clean = require('gulp-clean'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpSequence = require('gulp-sequence'),
  rollup = require('gulp-rollup'),
  rollupConfig = require('./rollup.config');

//clean dist files
gulp.task('clean', function() {
  gulp.src('dist/*').pipe(clean());
});

//parseJs
gulp.task('parseJs', function () {
  gulp.src([
    'src/**/**.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(rollup(rollupConfig))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
})

//parseWxml
gulp.task('parseWxml', function() {
  return gulp.src('src/**/**.wxml').pipe(gulp.dest('dist/'));
});

//parseWxss
gulp.task('parseWxss', function() {
  return gulp.src('src/**/**.wxss').pipe(gulp.dest('dist/'));
});

//parseJson
gulp.task('parseJson', function() {
  return gulp.src('src/**/**.json').pipe(gulp.dest('dist/'));
});

//build
gulp.task('build', gulpSequence('clean', 'parseJs','parseJson','parseWxml','parseWxss'));

//watch wxml js wxss
gulp.watch('src/**/**.wxml', function (event) {
  gulpSequence('parseWxml')(function (err) {
    if (err) console.log(err)
  })
})

gulp.watch('src/**/**.js', function (event) {
  gulpSequence('parseJs')(function (err) {
    if (err) console.log(err)
  })
})

gulp.watch('src/**/**.wxss', function (event) {
  gulpSequence('parseWxss')(function (err) {
    if (err) console.log(err)
  })
})
