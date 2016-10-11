var gulp = require('gulp'),
  clean = require('gulp-clean'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpSequence = require('gulp-sequence'),
  rollup = require('gulp-rollup'),
  rollupConfig = require('./rollup.config');

var Asset = {
  js:'src/pages/**/**.js',
  wxss:'src/**/**.wxss',
  wxml:'src/**/**.wxml',
  json:'src/**/**.json'
}

//clean dist files
gulp.task('clean', function() {
  return gulp.src('dist').pipe(clean());
});

gulp.task('copy', function() {
  return gulp.src('src/*').pipe(gulp.dest('dist/'));
});

//parseJs
gulp.task('parseJs', function () {
  return gulp.src([
    Asset.js,
  ])
  .pipe(sourcemaps.init())
  .pipe(rollup(rollupConfig))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/pages'));
})

//parseWxml
gulp.task('parseWxml', function() {
  return gulp.src(Asset.wxml).pipe(gulp.dest('dist/'));
});

//parseWxss
gulp.task('parseWxss', function() {
  return gulp.src(Asset.wxss).pipe(gulp.dest('dist/'));
});

//parseJson
gulp.task('parseJson', function() {
  return gulp.src(Asset.json).pipe(gulp.dest('dist/'));
});

gulp.task('watch',function(){
  gulp.watch(Asset.js, ['parseJs']);
  gulp.watch(Asset.wxss, ['parseWxss']);
  gulp.watch(Asset.wxml, ['parseWxml']);
  gulp.watch(Asset.json, ['parseJson']);
});

//build
gulp.task('build', gulpSequence('clean','copy', 'parseJs','parseJson','parseWxml','parseWxss'));
