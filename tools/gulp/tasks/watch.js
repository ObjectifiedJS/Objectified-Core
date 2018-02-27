var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch(['./src/Objectified-Core.js'], [
		'ObjectifiedCore',
		'lint'
	]);
});
