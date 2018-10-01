const gulp = require('gulp');
const copy = require('gulp-copy');
const argv = require('yargs').argv;
const rename = require('gulp-rename');
const replace = require('gulp-string-replace');
const src = './files';
const dest = '../';

function build(ok) {
    let ns = ['Dh', 'Plugin'];
    if ('pluginFileName' in argv) {
        argv['pluginSlug'] = argv.pluginFileName.replace(/^dh\-plugin/i, '').replace(/\.php$/i, '');
        argv['pluginId'] = argv['pluginSlug'].replace('-', '_');
        argv['pluginIdUppercase'] = argv['pluginId'].toUpperCase();
        let parts = argv['pluginId'].split('_');
        for (let i = 0; i < parts.length; i++) {
            ns.push(parts[i].charAt(0).toUpperCase() + parts[i].slice(1));
        }
        argv['pluginNamespace'] = '\\' + ns.join('\\');
        argv['pluginNamespaceEscaped'] = '\\\\' + ns.join('\\\\');
    }

    let task = gulp.src([src + '/**/*.*']);
    for (let key in argv) {
        if (argv.hasOwnProperty(key)) {
            if (key.match(/^plugin/) !== null) {
                task.pipe(replace(new RegExp('@' + key + '@', 'g'), argv[key], {logs: {enabled: false}}))
            }
        }
    }
    task
        .pipe(rename(function (path) {
            if (path.basename + path.extname === 'plugin.skeleton' && 'pluginFileName' in argv) {
                path.basename = 'dh-plugin-' + argv.pluginFileName;
                path.extname = '.php';
            }
        }))
        .pipe(rename(function (path) {
            if (path.extname === '.skeleton') {
                path.extname = '';
            }
        }))
        .pipe(gulp.dest(dest));

    ok();
}

gulp.task('build', gulp.series(build));
gulp.task('default', gulp.series(build));