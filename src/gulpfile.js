const gulp = require('gulp');
const copy = require('gulp-copy');
const argv = require('yargs').argv;
const rename = require('gulp-rename');
const replace = require('gulp-string-replace');
const src = './files';
const dest = '../';

function build() {
    let ns = ['DH', 'PLUGIN'];
    if ('pluginFileName' in argv) {
        argv['pluginId'] = argv.pluginFileName.replace(/^dh\-plugin/, '').replace(/\.php$/, '');
        argv['pluginIdUppercase'] = argv['pluginId'].toUpperCase();
        ns.concat(argv['pluginId'].split('-'));
        argv['pluginNamespace'] = '\\' + ns.join('\\');
    }

    let task = gulp.src([src + '/**/*.*']);
    for (let key in argv) {
        if (argv.hasOwnProperty(key)) {
            if (key.match(/^plugin/) !== null) {
                task.pipe(replace(new RegExp('@' + key + '@', 'g'), argv[key]))
            }
        }
    }
    task
        .pipe(rename(function (path) {
            if (path.basename + path.extname === 'plugin.skeleton' && 'pluginFile' in argv) {
                path.basename = argv.pluginFile;
                path.extname = '.php';
            }
        }))
        .pipe(rename(function (path) {
            if (path.extname === '.skeleton') {
                path.extname = '';
            }
        }))
        .pipe(gulp.dest(dest));

    return task;
}

gulp.task('build', gulp.series(build));
gulp.task('default', gulp.series(build));