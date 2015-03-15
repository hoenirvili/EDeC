module.exports = function(grunt){
	grunt.initConfig({
		
		pkg:grunt.file.readJSON('package.json'),
			sass:{ // task
				compile:{
					files:{
					'css/main.css' : 'sass/buildMain.sass'
					}
			  	}
			},
		watch:{
			options:{
				livereload:true
			},

			sass:{
				files:'sass/*.sass',
				tasks:'sass' // task defined in the upper section
			
			},
		},
		express:{
			
			all:{
					options:{
					port: 9000, // server at port 9000
					hostname: 'localhost',
					bases: ['html','css','js','php','.'],
					livereload:true
				}
			}
		}
	});
		grunt.loadNpmTasks('grunt-contrib-sass'); 
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-express');
		grunt.registerTask('live',['express','watch']);

}
