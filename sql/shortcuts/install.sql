SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;
--script for first database initialisation

start C:\wamp\EDeC\sql\install\edec_schema.sql
start C:\wamp\EDeC\sql\shortcuts\run_packages.sql
start C:\wamp\EDeC\sql\import\edec_import_all.sql
start C:\wamp\EDeC\sql\install\edec_triggers_sequences.sql
start C:\wamp\EDeC\sql\install\edec_views.sql