  SET SERVEROUTPUT ON;
  
  BEGIN
  
    --edec_caracteristici_package.importFromCSV('caracteristica.csv');
    --edec_media_package.importFromCSV('media.csv');
    --edec_users_package.importFromCSV('users.csv');
    --edec_produse_package.importFromCSV('produs.csv');
    --edec_produse_package.generateCaracteristics(10);
    --edec_users_package.populateLove(5);
    --edec_users_package.populateHate(5);
    edec_utils_package.exportAlltoCSV;
  END;
  /
  
  
  