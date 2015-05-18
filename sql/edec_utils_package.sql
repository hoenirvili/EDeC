
SET SERVEROUTPUT ON;

CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

CREATE OR REPLACE PACKAGE edec_utils_package AS
  PROCEDURE exportToCSV( v_table_name IN VARCHAR2,v_filename IN VARCHAR2 );
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
    v_separator := '"';
    FOR i IN 1 .. v_colCount LOOP
      DBMS_SQL.COLUMN_VALUE( v_theCursor, i, v_columnValue );
      UTL_FILE.PUT( v_output, v_separator || v_columnValue );
      v_separator := ',';
    end loop;
    UTL_FILE.NEW_LINE( v_output );
 END LOOP;
DBMS_SQL.CLOSE_CURSOR(v_theCursor);
UTL_FILE.FCLOSE( v_output );

END;
END edec_utils_package;
/