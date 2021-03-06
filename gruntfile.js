module.exports = function(grunt)
{
	grunt.initConfig({
			concat:{
				css:{
					src:['src/html/css/common.css','src/html/css/index.css','src/html/css/access.css','src/html/css/error.css',
                         'src/html/css/search.css','src/html/css/media-queries.css','src/html/css/controlpannel.css',
                         'src/html/css/product.css','src/html/css/stats.css'],
					dest: 'src/html/css/main.css'
				},
				js:{
					src:['src/html/js/index.js','src/html/js/access.js','src/html/js/search.js',
                         'src/html/js/product.js','src/html/js/stats.js','src/html/js/controlpanel.js'],
					dest:'src/html/js/main.js'
				}
			},
		watch:{
			css: {
				files: ['src/html/css/*.css'],
				tasks: ['concat']
			},
			js: {
				files: ['src/html/js/*.js'],
				tasks: ['concat']
			},
			options:{
				livereload : true
			}
		},
		express:{
			all:{
					options:{
					    port: 9000,
					    hostname: 'localhost',
					    bases: ['.','src','src/html'],
					    livereload : true
				}
			}
		},
	});
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-express');
		grunt.registerTask('live',['express','concat','watch'] );
}
