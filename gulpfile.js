const gulp = require('gulp');
const zip = require('gulp-zip');
const src = './src';

function dist() {
    return gulp.src([
        src + '/**/*'
    ])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./dist'));
}

gulp.task('dist', gulp.series(dist));
gulp.task('default', gulp.series(dist));