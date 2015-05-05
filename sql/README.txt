Instructions:

Please run in the following order
0.schema.sql;
1.edec_utils_package.sql
2.caracteristici_package.sql
3.products_package.sql
4.edec_users_package.sql

5.populate.sql


Modify path to csv files if necessary.
NOTE:

if packages dont work pls check if user have privileges

if not pls run  GRANT EXECUTE ON UTL_FILE TO <user_name>; when beeing SYS user