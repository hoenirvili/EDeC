SET SERVEROUTPUT ON;

CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv'; 
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

CREATE OR REPLACE PACKAGE edec_users_package AS

  WRONG_EMAIL_FORMAT EXCEPTION;
  WRONG_USERNAME_FORMAT EXCEPTION;
  WRONG_PASSWORD_FORMAT EXCEPTION;
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
    CK_EMAIL NUMBER;
    REGEX_EMAIL VARCHAR(93):='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2,4}|com|org|net|edu|gov||info|mobi|name|ro)$';
  BEGIN
   SELECT REGEXP_INSTR (v_email,REGEX_EMAIL) INTO CK_EMAIL
      FROM dual;
   RETURN CK_EMAIL;
  END checkEmail;
  
   FUNCTION checkUsername(v_username IN users.username%TYPE) RETURN NUMBER IS
    CK_USERNAME NUMBER;
    REGEX_USERNAME VARCHAR(53):='^(([a-zA-Z])(([a-zA-Z0-9\._-])+){4,23}([a-zA-Z0-9]))$';
    -- username starts with a alphabetical character
    -- allowed characters a to z (lower or upper) "." "_" and "-"
    -- just alphanumeric character at the end 
    -- min 6 max 25 characters
  BEGIN
   SELECT REGEXP_INSTR (v_username,REGEX_USERNAME) INTO CK_USERNAME
      FROM dual;
   RETURN CK_USERNAME;
  END checkUsername;
  
 
  --checks the email for the user
  FUNCTION checkPassword(v_pass IN users.email%TYPE) RETURN NUMBER IS
    CK_PASSWORD NUMBER;
    REGEX_PASSWORD VARCHAR(29):='^[a-zA-Z0-9\.\#$%^*_-]{6,18}$';
  BEGIN
   SELECT REGEXP_INSTR (v_pass,REGEX_PASSWORD) INTO CK_PASSWORD
      FROM dual;
   RETURN CK_PASSWORD;
  END checkPassword;

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
       IF checkUsername(v_username)=0 THEN RAISE WRONG_USERNAME_FORMAT;END IF;
       IF checkPassword(v_pass)=0 THEN RAISE WRONG_PASSWORD_FORMAT;END IF;
       
      INSERT INTO users(username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_username, v_pass, v_email,v_avatar, v_tip, v_data_nasterii, v_sex);
  EXCEPTION
    WHEN WRONG_EMAIL_FORMAT THEN
       DBMS_OUTPUT.PUT_LINE('Wrong email format for user '||v_username);
    WHEN WRONG_USERNAME_FORMAT THEN
        IF LENGTH(v_username)>25 THEN DBMS_OUTPUT.PUT_LINE('Username too long');
        ELSE DBMS_OUTPUT.PUT_LINE('Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]'));
        END IF;
    WHEN WRONG_PASSWORD_FORMAT THEN
        IF LENGTH(v_pass)>18 THEN DBMS_OUTPUT.PUT_LINE('Password too long');
        ELSE DBMS_OUTPUT.PUT_LINE('Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
        END IF;
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
            IF checkUsername(v_username)=0 THEN RAISE WRONG_USERNAME_FORMAT;END IF;
            
            insertUser(v_username,v_pass,v_email,TO_NUMBER(v_avatar),TO_NUMBER(v_tip),TO_DATE(v_data_nasterii),v_sex);
            it:=it+1;
            COMMIT;
          EXCEPTION
            WHEN WRONG_EMAIL_FORMAT THEN
              DBMS_OUTPUT.PUT_LINE('Wrong email format for user '||v_username||' at line '||it||' from file \\EDeC\sql\csv\users_csv.txt');
              it:=it+1;
            WHEN WRONG_USERNAME_FORMAT THEN
              IF LENGTH(v_username)>15 THEN DBMS_OUTPUT.PUT_LINE('Username too long');
                ELSE DBMS_OUTPUT.PUT_LINE('Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]')||' at line '||it);
              END IF;
              it:=it+1;
             WHEN WRONG_PASSWORD_FORMAT THEN
              IF LENGTH(v_pass)>18 THEN DBMS_OUTPUT.PUT_LINE('Password too long');
               ELSE DBMS_OUTPUT.PUT_LINE('Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]')||' at line '||it);
              END IF;
              it:=it+1;
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
  

