module.exports = function(grunt){
	grunt.initConfig({

		pkg:grunt.file.readJSON('package.json'),
			// concat
			concat:{
				css:{
					src:['css/index.css','css/login.css','register.css'],
					dest: 'css/main.css',
				},

				js:{
					src:['js/index.js'],
					dest:'js/main.js',
				}
			},
		watch:{
			css: {
				files: ['css/*.css'],
				tasks: ['concat'],
			},
			js: {
				files: ['js/*.js'],
				tasks: ['concat'],
			},
			options:{
				//livereload:true
			}
		},
		express:{

			all:{
					options:{
					port: 9000, // server at port 9000
					hostname: 'localhost',
					bases: ['html','css','js','php','.'],
				//	livereload:true
				}
			}
		}
	});
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-express');
		grunt.registerTask('live',['express','watch']);

}
