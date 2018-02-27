var gulpInternalError = require('../utils/handleErrors'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

var buildFileArray = [
	'./src/Objectified-Core.js'
]

gulp.task('ObjectifiedCore', 
	gulpInternalError(function(success, gulpBuildError) {

		// concat on one file???
		return gulp.src(buildFileArray)
			.pipe(concat('Objectified-Core.js').on('error', gulpBuildError))
			.pipe(gulp.dest('./dist/'))
			.pipe(uglify().on('error', gulpBuildError))
			.pipe(rename({
				'extname':'.min.js'
			}))
			.pipe(gulp.dest('./dist/'));
	})
);
