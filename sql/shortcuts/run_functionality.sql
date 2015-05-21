
--script for running the functionality of the database

SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

start "C:\wamp\EDeC\sql\shortcuts\run_packages.sql"
start "C:\wamp\EDeC\sql\install\edec_triggers_sequences.sql"
start "C:\wamp\EDeC\sql\install\edec_views.sql"