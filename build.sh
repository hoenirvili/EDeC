#!/bin/bash


#GLOBAL VAR

#Source path (BASE)
	html=src/html/*.html
	css=src/html/css/
	js=src/html/js/
	img=src/html/img/
	php=src

#Dest path 
	dest=build

#MAIN STYLESHEETCSS PATH
	mainCSS=src/html/css/main.css
	mediaCSS=src/html/css/media-queries.css

	mainJS=src/html/js/main.js

#FTP
	HOST="ftp.derikon.com"
	PORT=21
	PATH_DEPLOY=build/*
#Main funciton build html
function buildHTML
{	
	
	echo
	echo 
	echo '## Building HTML ##' 
	echo '## SOURCE:' $html
	echo '## DEST:' $dest
	echo
	echo 

	#if html file dosen't exist create it
	if ! [ -d build/html ] 
		then
			echo '==> build/html'
			mkdir build/html
	fi

	for file in $html
	do 
		#Copy every html file into build directory
		echo '==> '$file
		cp $file $dest/html/
		sleep 1s
	done
}

#Main function build css
function buildCSS
{

	echo
	echo  
	echo '## BUILDING CSS ##'
	echo '## SOURCE: ' $css*
	echo '## DEST: ' $dest
	echo
	echo 

	#Create css file
	if ! [ -d build/html/css ] 
		then
			echo '==> build/html/css'
			mkdir build/html/css
	fi

	for file in $css*.css
	do
		#Copy every css root file into build directory
		
		if [ $file == $mainCSS -o $file == $mediaCSS ] 
			then
				echo '==> '$file
				cp $file $dest/html/css/
				sleep 1s
		fi
	done

	for dir in $css*
	do
		#Copy every css directory/plugins into the build directory

		if [ -d $dir ]  
			then
				echo '==> '$dir
				cp -r $dir $dest/html/css/
				sleep 1s
		fi	
	done

}

#Main function build js
function buildJS
{
	echo
	echo  
	echo '## BUILDING CSS ##'
	echo '## SOURCE: ' $js*
	echo '## DEST: ' $dest
	echo
	echo

	#Create js file
	if ! [ -d build/html/js/ ]
		then
			echo '==> build/html/js'
			mkdir build/html/js
	fi

	for file in $js*.js
	do
		#Copy every css root file into build directory

		if [ $file == $mainJS ] 
			then
				echo '==>' $file
				cp $file $dest/html/js
				sleep 1s
		fi
	done


	for dir in $js*
	do
		#Copy every js directory/plugins int the build directory
		
		if [ -d $dir ]
			then
				echo '==>' $dir
				cp -r $dir $dest/html/js
				sleep 1s
		fi
	done
}

#Main function build images
function buildIMG
{
	echo
	echo  
	echo '## BUILDING IMG ##'
	echo '## SOURCE: ' $img*
	echo '## DEST: ' $dest
	echo
	echo

	#Create img file
	if ! [ -d build/html/img ]
		then
			echo '==> build/html/img'
			mkdir build/html/img
	fi

	for file in $img*
	do
		#Copy every image/image-directory root file into build directory

				echo '==>' $file
				cp -r $file $dest/html/img
				sleep 1s
	done

}

#Main functon build php
function buildPHP
{

	echo
	echo  
	echo '## BUILDING PHP ##'
	echo '## SOURCE: ' $php
	echo '## DEST: ' $dest
	echo
	echo

	#Create img file
	if ! [ -d build/application ]
		then
			echo '==> build/application'
			mkdir build/application
	fi

	for file in $php/application
	do
		#Copy every php root file into build directory

				echo '==>' $file
				cp -r $file $dest/
				sleep 1s
		
	done

	for file in $php/*.php
	do
			#Copy every php file that is in src root directory
			echo '==>'
			cp -r $file $dest/
			sleep 1s
	done


}
function buildDEPLOY
{
read -p "username: " USER
stty -echo
read -p "password: " PASS
stty echo

echo 
echo
echo '## Deployment'
echo 
echo 
ftp -inv  << ftp_script
open $HOST $PORT
user $USER $PASS
put $PATH_DEPLOY
ls
close
bye
ftp_script
echo
echo
}

echo '## BUILDING SCRIPT ##'
echo '	 Starting..'
sleep 2s
echo
echo 
echo '## Building script menu ##'
echo 
echo
echo '   1.Build the project'
echo '   2.Reset build directory'
echo '   3.Deployment'
echo '   4.Exit from the script'
echo '   help'
echo

while [ true ] 
do

	read -p "==> " mn

		case $mn in
			#Build the project
			1)
				buildHTML $html $dest
				buildCSS $css $dest
				buildJS $js $dest
				buildIMG $img $dest
				buildPHP $php $dest
				;;
			2) 
				echo '## Reset build directory'
				rm -rf build/*
				;;
			3) 
				buildDEPLOY $HOST $PORT $PATH_DEPLOY
				;;

			4)
				exit 1
				;;
			

			"help")
				echo
				echo 
				echo '## Building script menu ##'
				echo 
				echo
				echo '   1.Build the project'
				echo '   2.Reset build directory'
				echo '   3.Deployment'
				echo '   4.Exit from the script'
				echo '   help'
				echo
				;;
			*)
				echo 'Unknow command'
				exit 1
				;;

		esac
done
