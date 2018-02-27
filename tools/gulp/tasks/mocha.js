var gulp = require('gulp'),
	mocha = require('gulp-mocha');

// mocha that JS
gulp.task('mocha', function() {
	return gulp.src('./tests/*.js')
		.pipe(mocha({
			reporter: 'nyan' 
		}));
});
