var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('watch', ['less','concat-controllers','concat-directives'], function(){
	watch('./src/styles/**/*.less',function(){
		gulp.start('less');
	});
	watch('./src/scripts/controllers/**/*.js',function(){
		gulp.start('concat-controllers');
	});
	watch('./src/scripts/directives/**/*.js',function(){
		gulp.start('concat-directives');
	});
})