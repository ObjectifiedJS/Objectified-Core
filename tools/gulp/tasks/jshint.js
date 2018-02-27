var gulp = require('gulp'),
    jshint = require('gulp-jshint');

// Lint JS
gulp.task('lint', function() {
    return gulp.src([
        './src/**/*.js',
        './src/*.js'
    ]).pipe(jshint({
        validthis:true
    })).pipe(jshint.reporter('default'));
});
