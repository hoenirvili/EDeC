  
CREATE OR REPLACE PACKAGE edec_media_package IS

  WRONG_IMAGE_URL EXCEPTION;

  PROCEDURE importFromCSV(input_file_name IN VARCHAR2) ;
  PROCEDURE insertMedia (v_url IN media.url%TYPE,v_json IN MEDIA.FILE_JSON%TYPE);
  PROCEDURE exportToCSV ;
  
END edec_media_package;
/

CREATE OR REPLACE PACKAGE BODY edec_media_package IS

--checks the url for the imagine
FUNCTION checkImageURL(v_url IN media.url%TYPE) RETURN NUMBER IS
BEGIN
  --checking the url's extension for the imagine
    IF (LOWER(SUBSTR(v_url,(LENGTH(v_url)-3),LENGTH(v_url))))!='.jpg' THEN 
      IF (LOWER(SUBSTR(v_url,(LENGTH(v_url)-3),LENGTH(v_url))))!='.png' THEN
        IF (LOWER(SUBSTR(v_url,(LENGTH(v_url)-4),LENGTH(v_url))))!='.jpeg' THEN
              RETURN 0;
        END IF;
      END IF;
    END IF;
  RETURN 1;
END checkImageURL;

--insereaza un obiect media in tabela media
PROCEDURE insertMedia (v_url IN media.url%TYPE,v_json IN MEDIA.FILE_JSON%TYPE) IS

BEGIN
  IF checkImageURL(v_url)=0 THEN
            RAISE WRONG_IMAGE_URL;
          END IF;
  INSERT INTO media(url,FILE_JSON) VALUES (v_url,v_json);
EXCEPTION
  WHEN WRONG_IMAGE_URL THEN
      raise_application_error(-20019,'Wrong imagine url ');
END insertMedia; 

PROCEDURE insertMedia (v_id media.id%TYPE,v_url IN media.url%TYPE,v_json IN MEDIA.FILE_JSON%TYPE) IS

BEGIN
  IF checkImageURL(v_url)=0 THEN
            RAISE WRONG_IMAGE_URL;
          END IF;
  INSERT INTO media(id,url,FILE_JSON) VALUES (v_id,v_url,v_json);
EXCEPTION
  WHEN WRONG_IMAGE_URL THEN
      raise_application_error(-20020,'Wrong imagine url ');
END insertMedia; 

--populeaza tabela media
PROCEDURE importFromCSV(input_file_name IN VARCHAR2) IS
 
  input_file UTL_FILE.FILE_TYPE;
  V_LINE VARCHAR2(1000);
  v_id media.id%TYPE;
  v_url media.url%TYPE;
  v_file_json media.file_json%TYPE;
  it NUMBER:=1;
 
BEGIN

   input_file := UTL_FILE.FOPEN ('USER_DIR',input_file_name, 'R');
   
   IF UTL_FILE.IS_OPEN(input_file) THEN
   UTL_FILE.GET_LINE(input_file, V_LINE, 1000);--ignore the first line with header info
      LOOP
        BEGIN
        
          UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
          
          IF V_LINE IS NULL THEN
            EXIT;
          END IF;
          v_id:=REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
          v_url := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          v_file_json := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 3);
          
          IF checkImageURL(v_url)=0 THEN
            RAISE WRONG_IMAGE_URL;
          END IF;
          
          insertMedia(TO_NUMBER(v_id),v_url,TO_NUMBER(v_file_json));
          it:=it+1;
          
        EXCEPTION
       WHEN WRONG_IMAGE_URL THEN
          raise_application_error(-20021,'Wrong imagine url at line'||it);
          it:=it+1; 
       WHEN DUP_VAL_ON_INDEX THEN
          raise_application_error(-20022,'Media already exists');
          it:=it+1;
       WHEN VALUE_ERROR THEN --when the file formar is wrong
          raise_application_error(-20023,'CSV file value error \\EDeC\sql\csv\'|| input_file_name || ' at  line '||it);
          ROLLBACK;--rollback any changes so far
          EXIT;--exit procedure
       WHEN NO_DATA_FOUND THEN
          EXIT;
       END;
     END LOOP;
     
    END IF;
    UTL_FILE.FCLOSE(input_file);
   
END importFromCSV;

  PROCEDURE exportToCSV IS
  BEGIN
    edec_utils_package.exportToCSV('media','media.csv');
  END exportToCSV;

END edec_media_package;
/

