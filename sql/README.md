#Instructions:

#### csv file update

- You should run this directly in sql plus or sql developer, running it trough an ide, or another java application may cause troubles do to the access you need to add triggers. 
- make sure that in the edec_caracteristici_package.sql file you have set the proper path to the csv file. 

####Please run in the following order
- edec_schema.sql;
- edec_media_package.sql
- edec_caracteristici_package.sql
- edec_products_package.sql
- edec_users_package.sql
- edec_populate.sql
- trigger_sequences.sql

####OR run just
- run.sql


###Modify path to csv files if necessary.
###NOTE:

- If packages dosen't work please check if user has privileges and if you don't have privilages run when beeing SYS user
` GRANT EXECUTE ON UTL_FILE TO <user_name>;` 

- If you have error on date please enter this command in your sqlplus or sqldeveloper and run it
` alter SESSION set NLS_DATE_FORMAT = 'DD-MM-YYYY' `