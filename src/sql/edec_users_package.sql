SET SERVEROUTPUT ON;
--seteaza directorul ?
CREATE OR REPLACE DIRECTORY USER_DIR AS 'D:\UAIC-COMPUTERSCIENCE\UAIC\ANII-SEM2\TW\EDEC\SRC\SQL\CSV'; 
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

CREATE OR REPLACE PACKAGE edec_users_package AS

PROCEDURE populateUsers;

END edec_users_package;
/
  
CREATE OR REPLACE PACKAGE BODY edec_users_package AS
--insereaza un user in tabela users
PROCEDURE insertUser (
    v_username IN  users.username%TYPE,
    v_pass IN  users.pass%TYPE,
    v_email IN  users.email%TYPE,
    v_avatar IN users.avatar%tYPE,
    v_tip IN  users.tip%TYPE,
    v_data_nasterii IN  users.data_nasterii%TYPE,
    v_sex IN  users.sex%TYPE) IS
BEGIN
    INSERT INTO users(username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_username, v_pass, v_email,v_avatar, v_tip, v_data_nasterii, v_sex);
END insertUser; 
  
PROCEDURE populateUsers IS
     input_file UTL_FILE.FILE_TYPE;
     V_LINE VARCHAR2(1000);
     v_username users.username%TYPE;
     v_pass users.pass%TYPE;
     v_email users.email%TYPE;
     v_avatar users.avatar%TYPE;
     v_tip users.tip%TYPE;
     v_data_nasterii users.data_nasterii%TYPE;
     v_sex users.sex%TYPE;

BEGIN
   input_file := UTL_FILE.FOPEN ('USER_DIR','users_csv.txt', 'R');
   IF UTL_FILE.IS_OPEN(input_file) THEN
      LOOP
        BEGIN
          UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
          IF V_LINE IS NULL THEN
            EXIT;
          END IF;
          v_username := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
          v_pass := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          v_email := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 3);
          v_avatar := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 4);
          v_tip := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 5);
          v_data_nasterii := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 6);
          v_sex := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 7);
          
           insertUser(v_username,v_pass,v_email,TO_NUMBER(v_avatar),TO_NUMBER(v_tip),TO_DATE(v_data_nasterii),v_sex);
          
          COMMIT;
        EXCEPTION
       WHEN NO_DATA_FOUND THEN
          EXIT;
       END;
     END LOOP;
    END IF;
    UTL_FILE.FCLOSE(input_file);
   
END populateUsers;

END edec_users_package;
/
  
BEGIN
   edec_users_package.populateUsers;
END;
