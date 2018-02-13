var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var tar = './src/tar';

gulp.task('concat-controllers', function(){
	gulp.src('./src/scripts/controllers/**/*.js').
	pipe(concat('controllers.js')).
	on('error', notify.onError("Error: <%= error.message %>")).
	pipe(gulp.dest(tar));
})

gulp.task('concat-directives', function(){
	gulp.src('./src/scripts/directives/**/*.js').
	pipe(concat('directives.js')).
	on('error', notify.onError("Error: <%= error.message %>")).
	pipe(gulp.dest(tar));
})

gulp.task('concat-services', function(){
	gulp.src('./src/scripts/services/**/*.js').
	pipe(concat('services.js')).
	on('error', notify.onError("Error: <%= error.message %>")).
	pipe(gulp.dest(tar));
})