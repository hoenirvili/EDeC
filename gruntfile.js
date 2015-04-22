module.exports = function(grunt)
{
	grunt.initConfig({
			concat:{
				css:{
					src:['src/css/index.css','src/css/login.css','src/css/register.css','src/css/media-queries.css'],
					dest: 'src/css/main.css'
				},
				js:{
					src:['src/js/index.js','src/js/login.js'],
					dest:'src/js/main.js'
				},
			},
		watch:{
			css: {
				files: ['src/css/*.css'],
				tasks: ['concat']
			},
			js: {
				files: ['src/js/*.js'],
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
					    bases: ['.','src'],
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
