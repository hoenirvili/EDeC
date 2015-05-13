--seteaza directorul ?
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv'; 
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

  
CREATE OR REPLACE PACKAGE edec_media_package IS

PROCEDURE populateMedia ;
PROCEDURE insertMedia (v_url IN media.url%TYPE,v_json IN MEDIA.FILE_JSON%TYPE);
END edec_media_package;
/

CREATE OR REPLACE PACKAGE BODY edec_media_package IS

--insereaza un obiect media in tabela media
PROCEDURE insertMedia (v_url IN media.url%TYPE,v_json IN MEDIA.FILE_JSON%TYPE) IS
BEGIN

  INSERT INTO media(url,FILE_JSON) VALUES (v_url,v_json);
  
END insertMedia; 

--populeaza tabela media
PROCEDURE populateMedia IS
  --wrong_image EXCEPTION;
  input_file UTL_FILE.FILE_TYPE;
  V_LINE VARCHAR2(1000);
  v_url media.url%TYPE;
  v_file_json media.file_json%TYPE;
  it NUMBER:=1;
 
BEGIN

   input_file := UTL_FILE.FOPEN ('USER_DIR','media_csv.txt', 'R');
   
   IF UTL_FILE.IS_OPEN(input_file) THEN
      LOOP
        BEGIN
          UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
          IF V_LINE IS NULL THEN
            EXIT;
          END IF;
          v_url := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
          
          v_file_json := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          
           insertMedia(v_url,TO_NUMBER(v_file_json));
           it:=it+1;
          
        EXCEPTION
       WHEN VALUE_ERROR THEN --when the file formar is wrong
          DBMS_OUTPUT.PUT_LINE('CSV file value error \\EDeC\sql\csv\media_csv.txt at  line '||it);
          ROLLBACK;--rollback any changes so far
          EXIT;--exit procedure
       WHEN NO_DATA_FOUND THEN
          EXIT;
       END;
     END LOOP;
     
    END IF;
    UTL_FILE.FCLOSE(input_file);
   
END populateMedia;

END edec_media_package;
/

