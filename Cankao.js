module.exports = function(grunt) {
    // 项目配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        app : 'static/assets/',
        build: 'static/build/',
        lib : 'static/lib/',
        dist: 'static/dist/',


        // 对文件hash处理
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [
                        '<%= dist %>*.*'
                    ]
                }]
            }
        },

        // js合并依赖
        concat: {
            options: {
                paths: ['.']
            },

            deer: {
                options: {
                    include: 'relative'
                },
                files: [
                    {
                        src: [
                            'static/lib/zepto/1.1.6/zepto-debug.js',
                            '<%= app %>md5.js',
                            '<%= app %>api.js',
                            '<%= app %>main.js',
                            'static/lib/slider/slider.js',
                            'static/lib/touchslide/TouchSlide.1.1.js',
                        ],
                        dest: '<%= build %><%= pkg.vers.deer %>/common.js'
                    },
                    {
                        src: [
                            'static/lib/jQuery/1.8.2/jquery-1.8.2.js',
                            'static/lib/unslider/1.0.0/unslider.js',
                            'static/lib/qrcode/1.0.0/jquery.qrcode.js',
                            'static/lib/qrcode/1.0.0/qrcode.js',
                            'static/lib/slider/slider.js',
                        ],
                        dest: '<%= build %><%= pkg.vers.deer %>/common-pc.js'
                    }
                ]
            }

        },

        // 压缩js文件
        uglify: {
            options: {
                banner: '/** @preserve Copyright 2010-2014 Qiandeer.com. All Rights Reserved. */\n'
            },

            deer: {
                files: [
                    {
                        expand: true,
                        cwd: 'static/build/<%= pkg.vers.deer %>',
                        src: ['*'],
                        dest: '<%= dist %><%= pkg.vers.deer %>/',
                        ext: '.js'
                    }
                ]
            }
        },

        // 合并压缩css文件
        cssmin: {
            options: {
                banner: '/** @preserve Copyright 2010-2014 Qiandeer.net. All Rights Reserved. */'
            },

            deer: {
                files: [
                    {
                        src: [
                            '<%= app %>global.css',
                            '<%= app %>main.css'
                        ],
                        dest: '<%= dist %><%= pkg.vers.deer %>/common.css'
                    }
                ]
            }

        },

        // 模板压缩
        htmlmin: {
            options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
            },

            deer: {
                files: {
                    '<%= dist %><%= pkg.vers.deer %>/home.tpl': 'static/tpl/home.tpl',
                    '<%= dist %><%= pkg.vers.deer %>/login.tpl': 'static/tpl/login.tpl'
                }
            }
        },

        // 内容替换
        replace: {

            deer: {
                src: ['template/*.html', 'template/*/*.html', 'static/page/*.html', 'static/page/*/*.html'],
                overwrite: true,
                //dest: ['template/build/'],
                replacements: [
                    {
                        from: /\/\/dn-w-qiandeer.qbox.me\/qd\/static\/dist\/.*common.css/,
                        to: '//dn-w-qiandeer.qbox.me/qd/static/dist/<%= pkg.vers.deer %>/common.css'
                    },
                    {
                        from: /\/\/dn-w-qiandeer.qbox.me\/qd\/static\/dist\/.*common.js/,
                        to: '//dn-w-qiandeer.qbox.me/qd/static/dist/<%= pkg.vers.deer %>/common.js'
                    },
                    {
                        from: /\/\/dn-w-qiandeer.qbox.me\/qd\/static\/dist\/.*common-pc.js/,
                        to: '//dn-w-qiandeer.qbox.me/qd/static/dist/<%= pkg.vers.deer %>/common-pc.js'
                    },
                ]
    },
    tpl: {
                src: ['static/dist/<%= pkg.vers.deer %>/*.js'],
                overwrite: true,
                //dest: ['template/build/'],
                replacements: [
                    {
                        from: /\/static\/tpl\/login.tpl/,
                        to: '//dn-w-qiandeer.qbox.me/qd/static/dist/<%= pkg.vers.deer %>/login.tpl'
                    },
                    {
                        from: /\/static\/tpl\/home.tpl/,
                        to: '//dn-w-qiandeer.qbox.me/qd/static/dist/<%= pkg.vers.deer %>/home.tpl'
                    }

                ]
            }
        },


        // 线上文件部署
        copy: {
        },

        // 清理临时文件
        clean: {
            build: ['static/build'],
            //dist: ['static/dist/*'],
            temp: ['template-back/*']
        }

    });


    // 加载 concat 合并
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 加载 uglify 压缩插件(Minify files with UglifyJS)
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 加载 cssmin 压缩css
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 加载 copy 文件复制
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 加载 clean 临时文件清理
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 加载 htmlmin 文件内容替换
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // 加载监控
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 加载 replace 文件内容替换
    grunt.loadNpmTasks('grunt-text-replace');


    // 注册 项目 deploy
    grunt.registerTask('deploy', ['clean', 'concat', 'uglify', 'cssmin', 'clean:build','htmlmin', 'replace']);

    grunt.registerTask('html', ['htmlmin']);

    // 注册 default task(s)别名，代理执行
    //grunt.registerTask('default', ['transport', 'concat', 'uglify', 'clean']);
    grunt.registerTask('default', ['clean']);
};
