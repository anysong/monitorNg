var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('watch', ['less','concat'], function(){
	watch('./src/styles/**/*.less',function(){
		gulp.start('less');
	})
	watch('./src/scripts/**/*.js',function(){
		gulp.start('concat');
	})
})