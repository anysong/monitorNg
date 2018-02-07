var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var tar = './src/tar';

gulp.task('concat', function(){
	gulp.src('./src/scripts/controllers/**/*.js').
	pipe(concat('controllers.js')).
	on('error', notify.onError("Error: <%= error.message %>")).
	pipe(gulp.dest(tar));
})