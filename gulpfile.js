const gulp = require('gulp');
const zip = require('gulp-zip');

function dist() {
    return gulp.src([
        theme + '/**/*',
        '!' + theme + '/node_modules/**',
        '!' + theme + '/composer.json',
        '!' + theme + '/composer.lock',
        '!' + theme + '/package-lock.json'
    ])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./dist'));
}

gulp.task('dist', gulp.series(dist));
gulp.task('default', gulp.series(dist));