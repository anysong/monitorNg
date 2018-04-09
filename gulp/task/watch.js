var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('watch', ['less','concat-controllers','concat-directive','concat-services'], function(){
	watch('./src/styles/**/*.less',function(){
		gulp.start('less');
	});
	watch('./src/scripts/controllers/**/*.js',function(){
		gulp.start('concat-controllers');
	});
	watch('./src/scripts/directive/**/*.js',function(){
		gulp.start('concat-directive');
	});
	watch('./src/scripts/services/**/*.js',function(){
		gulp.start('concat-services');
	});
})
