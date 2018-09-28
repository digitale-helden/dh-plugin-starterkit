const gulp = require('gulp');
const copy = require('gulp-copy');
const argv = require('yargs').argv;
const src = './files';
const dest = '../';

function build() {
    return gulp.src([src + '/**/*.*'])
        .pipe(gulp.dest(dest));
}

gulp.task('build', gulp.series(build));
gulp.task('default', gulp.series(build));