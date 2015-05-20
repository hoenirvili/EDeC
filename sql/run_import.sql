--script for importing all the data from csv without the caracteristics (only when the data from caractersitics was not modified)


BEGIN
 
  edec_utils_package.exportall_no_carac;
  
END;
/

start C:\wamp\EDeC\sql\edec_triggers_sequences.sql
