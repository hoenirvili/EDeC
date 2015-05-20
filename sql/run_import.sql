--script for importing all the data from csv without the caracteristics (only when the data from caractersitics was not modified)

DELETE FROM user_hates;
DELETE FROM user_loves;
DELETE FROM users;
DELETE FROM caracteristici_produse;
DELETE FROM produs;
DELETE FROM media;
            
COMMIT; 

BEGIN
 
  edec_utils_package.exportall_no_carac;
  
END;
/

start C:\wamp\EDeC\sql\edec_triggers_sequences.sql
