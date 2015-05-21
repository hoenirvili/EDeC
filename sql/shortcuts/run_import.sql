--script for importing all the data from csv without the caracteristics (only when the data from caractersitics was not modified)

SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'E:\Facultate\ANUL 2\SEM2\TW\EDeC\sqlcsv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;
DELETE FROM user_hates;
DELETE FROM user_loves;
DELETE FROM users;
DELETE FROM caracteristici_produse;
DELETE FROM produs;
DELETE FROM media;
            
COMMIT; 

BEGIN
 
  edec_utils_package.importall_no_carac;
  
END;
/

start "E:\Facultate\ANUL 2\SEM2\TW\EDeC\sql\install\edec_triggers_sequences.sql"
