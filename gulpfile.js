var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    header = require("gulp-header"),
    Server = require('karma').Server,
    coveralls = require('gulp-coveralls'),
    del = require('del'),
    nugetpack = require('gulp-nuget-pack'),
    pkg = require('./package.json');

var banner = '/*  bower-angular-summernote v<%=pkg.version%> | (c) 2016 JeongHoon Byun | MIT license */\n';
var isAngular17 = false;

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js', './test/**/*.test.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy', function() {
  return gulp.src('./src/angular-summernote.js')
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy'], function() {
  return gulp.src('./src/angular-summernote.js')
    .pipe(uglify({mangle: false}))
    .pipe(rename({extname: '.min.js'}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('dist'));
});