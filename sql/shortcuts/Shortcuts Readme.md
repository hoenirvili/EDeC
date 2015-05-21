###General Info

This folder is used to store simplified scripts that any user can run and use to control the database.  

###Contents

 - **install.sql**-sql script used **ONLY** when running the database for the first time, it calls the scripts from the install folder + the import ;
 - **run_functionality.sql**-sql script used to run the packages,triggers,sequences and views, running this script does not affect the data from the database -only the functionality of it;
 - **run_import.sql** - sql script used to import the data from the csv files except the *caracteristica.csv* file ( importing this file takes a while and it should be done only when you are sure that you have modified the file ), this script first empties the tables and after it imports the data from the files;
 - **run_packages.sql** - sql script used to run all the script files that contains the packages;
###Mention
As said before, *install.sql* should be run only once, the first time you make the database.