SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

start C:\wamp\EDeC\sql\2.edec_media_package.sql
start C:\wamp\EDeC\sql\3.edec_caracteristici_package.sql
start C:\wamp\EDeC\sql\4.edec_products_package.sql
start C:\wamp\EDeC\sql\5.edec_users_package.sql
start C:\wamp\EDeC\sql\6.edec_utils_package.sql
start C:\wamp\EDeC\sql\7.edec_user_functions_package.sql