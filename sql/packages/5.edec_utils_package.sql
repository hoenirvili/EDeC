
CREATE OR REPLACE PACKAGE edec_utils_package AS

  PROCEDURE exportToCSV( v_table_name IN VARCHAR2,v_filename IN VARCHAR2 );
  PROCEDURE exportALLtoCSV;
  PROCEDURE importALLfromCSV;
  
  PROCEDURE exportall_no_carac;
  
END edec_utils_package;
/

CREATE OR REPLACE PACKAGE BODY edec_utils_package AS
  PROCEDURE exportToCSV( v_table_name IN VARCHAR2,v_filename IN VARCHAR2 )
IS
 v_output        UTL_FILE.FILE_TYPE;
 v_theCursor     INTEGER DEFAULT DBMS_SQL.OPEN_CURSOR;
 v_columnValue   VARCHAR2(4000);
 v_status        INTEGER;
 v_query         VARCHAR2(1000)
                 DEFAULT 'SELECT * FROM ' || v_table_name;
 v_colCount        NUMBER := 0;
 v_separator     VARCHAR2(1);
 v_descTab       DBMS_SQL.DESC_TAB;
BEGIN
 v_output := utl_file.fopen( 'USER_DIR', v_filename, 'w' );
 EXECUTE IMMEDIATE 'ALTER SESSION SET NLS_DATE_FORMAT=''dd-mon-yyyy''';

 DBMS_SQL.parse(  v_theCursor,  v_query, DBMS_SQL.NATIVE );
 DBMS_SQL.describe_columns( v_theCursor, v_colCount, v_descTab );
 
 FOR i IN 1 .. v_colCount LOOP
    UTL_FILE.PUT( v_output, v_separator || v_descTab(i).col_name );
         DBMS_SQL.DEFINE_COLUMN( v_theCursor, i, v_columnValue, 4000 );
         v_separator := ',';
 END LOOP;
 UTL_FILE.NEW_LINE( v_output );
  
 v_status := DBMS_SQL.EXECUTE(v_theCursor);

 WHILE ( DBMS_SQL.FETCH_ROWS(v_theCursor) > 0 ) LOOP
    v_separator := '';
    FOR i IN 1 .. v_colCount LOOP
      DBMS_SQL.COLUMN_VALUE( v_theCursor, i, v_columnValue );
      UTL_FILE.PUT( v_output, v_separator || v_columnValue );
      v_separator := ',';
    end loop;
    UTL_FILE.NEW_LINE( v_output );
 END LOOP;
DBMS_SQL.CLOSE_CURSOR(v_theCursor);
UTL_FILE.FCLOSE( v_output );

END exportToCSV;

  PROCEDURE exportALLtoCSV IS
    CURSOR table_cursor IS
      SELECT table_name
      FROM user_tables;
    table_rec table_cursor%ROWTYPE;
  BEGIN
    FOR table_rec IN table_cursor LOOP
      exportToCSV(table_rec.table_name,(table_rec.table_name||'.csv'));
    END LOOP;
  END;
    
  PROCEDURE importFromCSVCaraProd IS
  input_file UTL_FILE.FILE_TYPE;
    V_LINE VARCHAR2(1000);
    v_id CARACTERISTICI_PRODUSE.id%TYPE;
    v_prod_id CARACTERISTICI_PRODUSE.produs_id%TYPE;   
    v_car_id CARACTERISTICI_PRODUSE.caracteristica_id%TYPE;
    it NUMBER:=1;

BEGIN

   input_file := UTL_FILE.FOPEN ('USER_DIR','CARACTERISTICI_PRODUSE.csv', 'R');
   
   IF UTL_FILE.IS_OPEN(input_file) THEN
      UTL_FILE.GET_LINE(input_file, V_LINE, 1000);--ignore the first line with header info
      LOOP
        BEGIN
          UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
          IF V_LINE IS NULL THEN
            EXIT;
          END IF;
          v_id:=REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
          v_prod_id := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          v_car_id := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 3);
          
           edec_produse_package.insertCarProd(TO_NUMBER(v_id),TO_NUMBER(v_prod_id),TO_NUMBER(v_car_id));
           it:=it+1;
        
        EXCEPTION
      WHEN DUP_VAL_ON_INDEX THEN
        raise_application_error(-20033,'Row already exists');
        it:=it+1;
      WHEN VALUE_ERROR THEN --when the file formar is wrong
        raise_application_error(-20032,'CSV file value error \\EDeC\sql\csv\CARACTERISTICI_PRODUSE.csv at  line '||it);
        ROLLBACK;--rollback any changes so far
        EXIT;--exit procedure
       WHEN NO_DATA_FOUND THEN
        EXIT;
       END;
     END LOOP;
    END IF;
    UTL_FILE.FCLOSE(input_file);
  END importFromCSVCaraProd;
  
  PROCEDURE importHateFromCSV IS
    input_file UTL_FILE.FILE_TYPE;
    V_LINE VARCHAR2(1000);
    v_id USER_HATES.id%TYPE;
    v_user_id USER_HATES.user_id%TYPE;   
    v_car_id USER_HATES.caracteristica_id%TYPE;
    it NUMBER:=1;
  BEGIN

   input_file := UTL_FILE.FOPEN ('USER_DIR','USER_HATES.csv', 'R');
   
   IF UTL_FILE.IS_OPEN(input_file) THEN
      UTL_FILE.GET_LINE(input_file, V_LINE, 1000);--ignore the first line with header info
      LOOP
        BEGIN
          UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
          IF V_LINE IS NULL THEN
            EXIT;
          END IF;
          v_id:=REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
          v_user_id := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          v_car_id := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 3);
          
           edec_users_package.insertHate(TO_NUMBER(v_id),TO_NUMBER(v_user_id),TO_NUMBER(v_car_id));
           it:=it+1;
        
        EXCEPTION
      WHEN DUP_VAL_ON_INDEX THEN
        raise_application_error(-20031,'Hate already exists');
        it:=it+1;
      WHEN VALUE_ERROR THEN --when the file formar is wrong
        raise_application_error(-20032,'CSV file value error \\EDeC\sql\csv\USER_HATES.csv at  line '||(it+1));
        ROLLBACK;--rollback any changes so far
        EXIT;--exit procedure
       WHEN NO_DATA_FOUND THEN
        EXIT;
       END;
     END LOOP;
    END IF;
    UTL_FILE.FCLOSE(input_file);
  END importHateFromCSV;
  
  PROCEDURE importLoveFromCSV IS
    input_file UTL_FILE.FILE_TYPE;
    V_LINE VARCHAR2(1000);
    v_id USER_LOVES.id%TYPE;
    v_user_id USER_LOVES.user_id%TYPE;   
    v_car_id USER_LOVES.caracteristica_id%TYPE;
    it NUMBER:=1;
  BEGIN

   input_file := UTL_FILE.FOPEN ('USER_DIR','USER_LOVES.csv', 'R');
   
   IF UTL_FILE.IS_OPEN(input_file) THEN
      UTL_FILE.GET_LINE(input_file, V_LINE, 1000);--ignore the first line with header info
      LOOP
        BEGIN
          UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
          IF V_LINE IS NULL THEN
            EXIT;
          END IF;
          v_id:=REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
          v_user_id := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          v_car_id := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 3);
          
           edec_users_package.insertLove(TO_NUMBER(v_id),TO_NUMBER(v_user_id),TO_NUMBER(v_car_id));
           it:=it+1;
        
        EXCEPTION
      WHEN DUP_VAL_ON_INDEX THEN
        raise_application_error(-20029,'Love already exists');
        it:=it+1;
      WHEN VALUE_ERROR THEN --when the file formar is wrong
        raise_application_error(-20030,'CSV file value error \\EDeC\sql\csv\USER_LOVES.csv at  line '||(it+1));
        ROLLBACK;--rollback any changes so far
        EXIT;--exit procedure
       WHEN NO_DATA_FOUND THEN
        EXIT;
       END;
     END LOOP;
    END IF;
    UTL_FILE.FCLOSE(input_file);
  END importLoveFromCSV;
  
  PROCEDURE importPreferencesFromCSV IS
    
  BEGIN
    importHateFromCSV;
    importLoveFromCSV;
  END importPreferencesFromCSV;
  
  PROCEDURE importALLfromCSV IS
  
  BEGIN
    edec_caracteristici_package.importFromCSV('caracteristica.csv');
    edec_media_package.importFromCSV('media.csv');
    edec_users_package.importFromCSV('users.csv');
    edec_produse_package.importFromCSV('produs.csv');
    importFromCSVCaraProd;
    importPreferencesFromCSV;
  END importALLfromCSV;
  
 PROCEDURE exportall_no_carac IS
 
 BEGIN
    edec_media_package.importFromCSV('media.csv');
    edec_users_package.importFromCSV('users.csv');
    edec_produse_package.importFromCSV('produs.csv');
    importFromCSVCaraProd;
    importPreferencesFromCSV;
 END exportall_no_carac;
END edec_utils_package;
/