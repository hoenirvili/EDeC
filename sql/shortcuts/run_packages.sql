--script for running only the packages with all the functions/procedures

SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

start "C:\wamp\EDeC\sql\packages\1.edec_media_package.sql"
start "C:\wamp\EDeC\sql\packages\2.edec_caracteristici_package.sql"
start "C:\wamp\EDeC\sql\packages\3.edec_products_package.sql"
start "C:\wamp\EDeC\sql\packages\4.edec_users_package.sql"
start "C:\wamp\EDeC\sql\packages\5.edec_utils_package.sql"
start "C:\wamp\EDeC\sql\packages\6.edec_user_functions_package.sql"