--script for importing all the data from csv without the caracteristics (only when the data from caractersitics was not modified)

SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;
BEGIN
 
  edec_utils_package.exportall_no_carac;
  
END;
/

start C:\wamp\EDeC\sql\install\edec_triggers_sequences.sql
