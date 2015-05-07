#Instructions:

####Please run in the following order
- schema.sql;
- edec_utils_package.sql
- caracteristici_package.sql
- products_package.sql
- edec_users_package.sql
- populate.sql


###Modify path to csv files if necessary.
###NOTE:

- If packages dosen't work please check if user has privileges and if you don't have privilages run when beeing SYS user
` GRANT EXECUTE ON UTL_FILE TO <user_name>;` 

- If you have error on date please enter this command in your sqlplus or sqldeveloper and run it
` alter SESSION set NLS_DATE_FORMAT = 'DD-MM-YYYY HH24:MI:SS' `