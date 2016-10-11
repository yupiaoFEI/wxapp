var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');
    gulpSequence = require('gulp-sequence'),
    rollup = require('gulp-rollup'),
    rename = require('gulp-rename'),
    rollupConfig = require('./rollup.config'),
    config = require('./config');


//clean dist files
gulp.task('clean', function() {
  return gulp.src(`${config.distPath}`)
    .pipe(clean());
});

//copy files
gulp.task('copy', function() {
  return gulp.src(`${config.basePath}/*`)
    .pipe(gulp.dest(`${config.distPath}/`));
});

//parseJs
gulp.task('parseJs', function() {
  return gulp.src([`${config.Asset.js}`, ]).
    pipe(sourcemaps.init()).
    pipe(rollup(rollupConfig)).
    pipe(sourcemaps.write('.')).
    pipe(gulp.dest(`${config.distPath}/pages`));
});

//parseWxml
gulp.task('parseWxml', function() {
  return gulp.src(`${config.Asset.wxml}`)
    .pipe(gulp.dest(`${config.distPath}/`));
});

//parseSass
gulp.task('parseSass', function() {
  return gulp.src(`${config.Asset.sass}`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      path.extname = ".wxss"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.distPath}/`));
});

//parseJson
gulp.task('parseJson', function() {
  return gulp.src(`${config.Asset.json}`)
    .pipe(gulp.dest(`${config.distPath}/`));
});

//watch
gulp.task('watch', function() {
  gulp.watch(`${config.Asset.pagejs}`, ['parsePageJs']);
  gulp.watch(`${config.Asset.componentjs}`, ['parsePageJs']);
  gulp.watch(`${config.Asset.sass}`, ['parseSass']);
  gulp.watch(`${config.Asset.wxml}`, ['parseWxml']);
  gulp.watch(`${config.Asset.json}`, ['parseJson']);
});

//build
gulp.task('build', gulpSequence('clean', 'copy' ,'parseJs', 'parseJson', 'parseWxml', 'parseSass'));
