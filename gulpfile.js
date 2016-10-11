var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');
    gulpSequence = require('gulp-sequence'),
    rollup = require('gulp-rollup'),
    rename = require('gulp-rename'),
    rollupConfig = require('./rollup.config');
const autoCompileGulpTask = require('wx-compile-key').autoCompileGulpTask;



var Asset = {
    js: 'src/pages/**/**.js',
    sass: 'src/**/**.scss',
    wxml: 'src/**/**.wxml',
    json: 'src/**/**.json'
}

//clean dist files
gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

//copy files
gulp.task('copy', function() {
  return gulp.src('src/*')
    .pipe(gulp.dest('dist/'));
});

//parseJs
gulp.task('parseJs', function() {
  return gulp.src([Asset.js, ]).
    pipe(sourcemaps.init()).
    pipe(rollup(rollupConfig)).
    pipe(sourcemaps.write('.')).
    pipe(gulp.dest('dist/pages'));
})

//parseWxml
gulp.task('parseWxml', function() {
  return gulp.src(Asset.wxml)
    .pipe(gulp.dest('dist/'));
});

//parseSass
gulp.task('parseSass', function() {
  return gulp.src(Asset.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      path.extname = ".wxss"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

//parseJson
gulp.task('parseJson', function() {
  return gulp.src(Asset.json)
    .pipe(gulp.dest('dist/'));
});

//watch
gulp.task('watch', function() {
  gulp.watch(Asset.js, ['parseJs']);
  gulp.watch(Asset.sass, ['parseSass']);
  gulp.watch(Asset.wxml, ['parseWxml']);
  gulp.watch(Asset.json, ['parseJson']);
});

//build
gulp.task('build', gulpSequence('clean', 'copy', 'parseJs', 'parseJson','parseWxml', 'parseSass'));
