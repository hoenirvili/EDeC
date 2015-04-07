module.exports = function(grunt){
	grunt.initConfig({

		pkg:grunt.file.readJSON('package.json'),
			concat:{
				css:{
					src:['css/index.css','css/login.css','css/register.css','css/media-queries.css'],
					dest: 'css/main.css',
				},

				js:{
					src:['js/index.js','js/login.js'],
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
			//options:{
			//	livereload:true
			//}
		},
		/*express:{

			all:{
					options:{
					    port: 9000,
					    hostname: 'localhost',
					    bases: ['html','css','js','php','.'],
					    livereload:true
				}
			}
		}*/
	});
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-express');
		//grunt.registerTask('live',['express','watch']);
        grunt.registerTask('live',['watch']);
}
