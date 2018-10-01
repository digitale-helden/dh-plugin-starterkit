module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        name: 'dh-plugin-@pluginId@',
        compress: {
            dist: {
                options: {
                    mode: 'zip',
                    archive: 'dist/<%= name %>.zip'
                },
                files: [{
                    src: [
                        'src/**',
                        'lib/**',
                        'inc/**',
                        'config/**',
                        'static/**',
                        'locale/**',
                        'templates/**',
                        '<%= name %>.php',
                        'README.md'
                    ], dest: '<%= name %>/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'static/css/plugin.min.css': ['assets/scss/plugin.scss']
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    mangle: true
                },
                files: {
                    'static/js/plugin.min.js': ['assets/js/plugin.js']
                }
            }
        },
        watch: {
            options: {
                spawn: false,
                interrupt: true,
                interval: 3000
            },
            scss: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass:dist']
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['uglify:dist']
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("dist", ["sass:dist", "uglify:dist", "compress:dist"]);
    grunt.registerTask("dev", ["watch"]);
};
