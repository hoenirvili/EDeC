SET SERVEROUTPUT ON;
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;
  BEGIN
  
    edec_utils_package.exportALLtoCSV;
    
  END;
  /
  
  
  