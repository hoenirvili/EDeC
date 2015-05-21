
SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'E:\Facultate\ANUL 2\SEM2\TW\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;
--script for first database initialisation

start "E:\Facultate\ANUL 2\SEM2\TW\EDeC\sql\install\edec_schema.sql"
start "E:\Facultate\ANUL 2\SEM2\TW\EDeC\sql\shortcuts\run_packages.sql"
start "E:\Facultate\ANUL 2\SEM2\TW\EDeC\sql\import\edec_import_all.sql"
start "E:\Facultate\ANUL 2\SEM2\TW\EDeC\sql\install\edec_triggers_sequences.sql"
start "E:\Facultate\ANUL 2\SEM2\TW\EDeC\sql\install\edec_views.sql"