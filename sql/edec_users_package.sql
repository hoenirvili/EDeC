SET SERVEROUTPUT ON;

CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv'; 
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

CREATE OR REPLACE PACKAGE edec_users_package AS

  WRONG_EMAIL_FORMAT EXCEPTION;
  --populeaza tabela de users
  PROCEDURE populateUsers;
  PROCEDURE insertUser (
    v_username IN  users.username%TYPE,
    v_pass IN  users.pass%TYPE,
    v_email IN  users.email%TYPE,
    v_avatar IN users.avatar%tYPE,
    v_tip IN  users.tip%TYPE,
    v_data_nasterii IN  users.data_nasterii%TYPE,
    v_sex IN  users.sex%TYPE);
    
  --populeaza tabela de user_hates
  PROCEDURE populateHate(max_car IN NUMBER);
  --populeaza tabela de user_loves
  PROCEDURE populateLove(max_car IN NUMBER);
  
  --insereaza o caracteristica pt un user in tabela user loves
  PROCEDURE insertLove(user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);
  --insereaza o caracteristica pt un user in tabela user hates
  PROCEDURE insertHate(user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);

END edec_users_package;
/
  
CREATE OR REPLACE PACKAGE BODY edec_users_package AS
  --insereaza o caracteristica pe care o selecteaza din caracteristici pt un user in tabela user loves
  PROCEDURE insertLove(user_id IN users.id%TYPE);
  --insereaza o caracteristica pe care o selecteaza din caracteristici pt un user in tabela user hates
  PROCEDURE insertHate(user_id IN users.id%TYPE);

  --checks the email for the user
  FUNCTION checkEmail(v_email IN users.email%TYPE) RETURN NUMBER IS
  BEGIN
     IF (LOWER(SUBSTR(v_email,(LENGTH(v_email)-3),LENGTH(v_email))))!='.com' THEN 
       IF (LOWER(SUBSTR(v_email,(LENGTH(v_email)-2),LENGTH(v_email))))!='.ro' THEN
              RETURN 0;
       END IF;
     END IF;
   RETURN 1;
  END checkEmail;

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
       IF checkEmail(v_email)=0 THEN RAISE WRONG_EMAIL_FORMAT;END IF;
       
      INSERT INTO users(username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_username, v_pass, v_email,v_avatar, v_tip, v_data_nasterii, v_sex);
  EXCEPTION
    WHEN WRONG_EMAIL_FORMAT THEN
       DBMS_OUTPUT.PUT_LINE('Wrong email format for user '||v_username);
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
       it NUMBER:=1;
  
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
            
            IF checkEmail(v_email)=0 THEN RAISE WRONG_EMAIL_FORMAT;END IF;
            
            insertUser(v_username,v_pass,v_email,TO_NUMBER(v_avatar),TO_NUMBER(v_tip),TO_DATE(v_data_nasterii),v_sex);
            it:=it+1;
            COMMIT;
          EXCEPTION
            WHEN WRONG_EMAIL_FORMAT THEN
              DBMS_OUTPUT.PUT_LINE('Wrong email format for user '||v_username||' at line '||it||' from file \\EDeC\sql\csv\users_csv.txt');
            WHEN VALUE_ERROR THEN --when the file formar is wrong
              DBMS_OUTPUT.PUT_LINE('CSV file value error \\EDeC\sql\csv\users_csv.txt at  line '||it);
              ROLLBACK;--rollback any changes so far
              EXIT;--exit procedure
         WHEN NO_DATA_FOUND THEN
              EXIT;
         END;
       END LOOP;
      END IF;
      UTL_FILE.FCLOSE(input_file);
     
  END populateUsers;
  
  PROCEDURE populateHate(max_car IN NUMBER) AS
    CURSOR user_cursor IS
      SELECT id
      FROM users;
      
    user_rec user_cursor%ROWTYPE;
    v_no_car NUMBER(3);
  BEGIN
    FOR user_rec in user_cursor LOOP
    
      v_no_car:=TRUNC(dbms_random.value(1,max_car));
      
      FOR i IN 0..v_no_car LOOP
        insertHate(user_rec.id);
      END LOOP;
    END LOOP;
  END populateHate;
  
  PROCEDURE populateLove(max_car IN NUMBER) AS
      CURSOR user_cursor IS
      SELECT id
      FROM users;
      
    user_rec user_cursor%ROWTYPE;
    v_no_car NUMBER(3);
  BEGIN
    FOR user_rec in user_cursor LOOP
    
      v_no_car:=TRUNC(dbms_random.value(1,max_car));
      
      FOR i IN 0..v_no_car LOOP
        insertLove(user_rec.id);
      END LOOP;
    END LOOP;
  END populateLove;
  
  PROCEDURE insertLove(user_id IN users.id%TYPE)AS
    carac_id caracteristica.id%TYPE;  
  BEGIN
    SELECT id INTO carac_id
      FROM ( SELECT id FROM caracteristica
            ORDER BY dbms_random.value )
      WHERE rownum = 1 ;
      
      INSERT INTO user_loves(user_id,caracteristica_id) VALUES (user_id,carac_id);
      
  END insertLove;
  
  PROCEDURE insertHate(user_id IN users.id%TYPE)AS
    carac_id caracteristica.id%TYPE;  
  BEGIN
    SELECT id INTO carac_id
      FROM ( SELECT id FROM caracteristica
            ORDER BY dbms_random.value )
      WHERE rownum = 1 ;
      
      INSERT INTO user_hates(user_id,caracteristica_id) VALUES (user_id,carac_id);
      
  END insertHate;
  
  PROCEDURE insertLove(user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE)
  IS
    BEGIN
       INSERT INTO user_loves(user_id,caracteristica_id) VALUES (user_id,carac_id);
    END insertLove;
  
    PROCEDURE insertHate(user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE)
  IS
    BEGIN
       INSERT INTO user_hates(user_id,caracteristica_id) VALUES (user_id,carac_id);
    END insertHate;

END edec_users_package;
/
  

