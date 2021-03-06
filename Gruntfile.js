module.exports = function (grunt) {
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

	//JS code minify
        uglify: {
            build: {
                options: {
                    preserveComments: 'some',
                    mangle: true
                    //mangle: change the var or function name
                },
                files: [{
                        expand: true,
                        cwd: 'src/',
                        src: '**/*.js',
					//equal to src/**/*.js
                        dest: 'build/scripts',
                        ext: '.min.js'
                        }]
            }
        },

	//js code error detect
        jshint: {
            all: ['src/**/*.js']
        },
	
	//css code minify
        cssmin: {
            target: {
                files: {
                    'build/styles/common.css': ['src/styles/test1.css', 'src/styles/test2.css']
					//merge 2 css files into 1 css file
                }
            }
        },
 
    //minify HTML code
        htmlmin: {
            dist: {
                options: {
                    removeRedundantAttributes: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    'build/index.html': 'src/index.html',
                }
            }
        },
 
	//copy one/some file(s) without any compress or beautify
        copy: {
            main: {
                files: [{
                        expand: true,
                        src: ['src/README'],
                        dest: 'build/',
                        filter: 'isFile'
                        }]
            }
        },
 
	//image compress
        imagemin: {
            dynamic: {
                options: {
					//compress level
                    optimizationLevel: 7
                },
                files: [{
                        expand: true,
                        cwd: 'src/srcimages',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '/home/rocker/vhost/ad/suoping/static/lock/images/<%= pkg.name %>/'
                        //这里要改
                        }]
            }
        },
 
	//monitor files' change and active some missions
		//this watch mission is to compress the pictures if some added
        watch: {
            test: {
                files: 'src/srcimages/**/*.{jpg,png,gif}',
                tasks: ['images']
            }
        },
 
	//delete some temp files
        clean: {
            test: {
                src: ['src/tempfile', '!src/keepthis']
            }
        },
 
	//replace some text
		//this mission is to change the urls of images to the CDN's
        replace: {
            test: {
                src: ['src/*.html'],
                overwrite: true,
                replacements: [{
                        from: 'srcimages',
                        to: 'http://w.qiandeer.com/qd/static/lock/images/<%= pkg.name %>'
						//这里要改
                        }]
            }
        }
    });
 
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Default task(s).
    grunt.registerTask('default', ['replace', 'jshint', 'uglify:build', 'cssmin', 'htmlmin', 'copy', 'clean', 'watch']);
    grunt.registerTask('images', ['imagemin']);
 
};

//the file tree :
// src
// ├── index.html
// ├── scripts
// │   ├── test1.js
// │   └── test2.js
// ├── srcimages
// │   ├── a.jpg
// │   ├── b.jpg
// │   └── c.png
// └── styles
//     ├── test1.css
//     └── test2.css


