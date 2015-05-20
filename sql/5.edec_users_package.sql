
CREATE OR REPLACE PACKAGE edec_users_package AS

    WRONG_EMAIL_FORMAT EXCEPTION;
    WRONG_USERNAME_FORMAT EXCEPTION;
    WRONG_PASSWORD_FORMAT EXCEPTION;
    USER_EXISTS_EMAIL EXCEPTION;
    USER_EXISTS_NAME EXCEPTION;
--populeaza tabela de users
  PROCEDURE importFromCSV(input_file_name IN VARCHAR2);
  PROCEDURE exportToCSV;
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
  PROCEDURE populateLove(v_no_car IN NUMBER);
-- verifica daca exista userul cu emailul respectiv
  FUNCTION userExistsEmail(v_email IN users.email%TYPE) RETURN BOOLEAN;
-- verifica daca exista userul cu numele respectiv
  FUNCTION userExistsName(v_name IN users.username%TYPE) RETURN BOOLEAN;
--insereaza o caracteristica pt un user in tabela user loves
  PROCEDURE insertLove(user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);
--insereaza o caracteristica pt un user in tabela user hates
  PROCEDURE insertHate(user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);
--insereaza o caracteristica pt un user in tabela user loves
  PROCEDURE insertLove(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);
--insereaza o caracteristica pt un user in tabela user hates
  PROCEDURE insertHate(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);

END edec_users_package;
/

CREATE OR REPLACE PACKAGE BODY edec_users_package AS
--insereaza o caracteristica pe care o selecteaza din caracteristici pt un user in tabela user loves
  PROCEDURE insertLove(user_id IN users.id%TYPE);
--insereaza o caracteristica pe care o selecteaza din caracteristici pt un user in tabela user hates
  PROCEDURE insertHate(user_id IN users.id%TYPE);

--checks the email for the user
  FUNCTION checkEmail(v_email IN users.email%TYPE) RETURN BOOLEAN IS
    CK_EMAIL NUMBER:=0;
    REGEX_EMAIL VARCHAR(93):='^[a-zA-Z0-9\._\-]+@([a-zA-Z0-9_\-]+\.)+(ro|info|com|org|edu|nz|au)$';
    BEGIN
      SELECT REGEXP_INSTR (v_email,REGEX_EMAIL) INTO CK_EMAIL
      FROM dual;
      IF CK_EMAIL>0
      THEN 
        RETURN TRUE;
      ELSE
        RETURN FALSE;
      END IF;
    END checkEmail;

  FUNCTION userExistsEmail(v_email IN users.email%TYPE) RETURN BOOLEAN IS
    v_count int:=0;
    BEGIN
      SELECT COUNT(*) INTO V_COUNT FROM USERS WHERE EMAIL=v_email;
      IF V_COUNT>0
      THEN
        return TRUE;
      ELSE
        return FALSE;
      END IF ;
    END userExistsEmail;

   FUNCTION userExistsName(v_name IN users.username%TYPE) RETURN BOOLEAN IS
    v_count int:=0;
    BEGIN
      SELECT COUNT(*) INTO V_COUNT FROM USERS WHERE username=v_name;
      IF V_COUNT>0
      THEN
        return TRUE;
      ELSE
        return FALSE;
      END IF ;
    END userExistsName;

  FUNCTION checkUsername(v_username IN users.username%TYPE) RETURN BOOLEAN IS
    CK_USERNAME NUMBER:=0;
    REGEX_USERNAME VARCHAR(53):='^(([a-zA-Z])(([a-zA-Z0-9\._-])+){4,23}([a-zA-Z0-9]))$';
-- username starts with a alphabetical character
-- allowed characters a to z (lower or upper) "." "_" and "-"
-- just alphanumeric character at the end 
-- min 6 max 25 characters
    BEGIN
      SELECT REGEXP_INSTR (v_username,REGEX_USERNAME) INTO CK_USERNAME
      FROM dual;
      IF CK_USERNAME>0
      THEN
        RETURN TRUE;
      ELSE 
        RETURN FALSE;
      END IF;
    END checkUsername;

--checks the email for the user
  FUNCTION checkPassword(v_pass IN users.email%TYPE) RETURN BOOLEAN IS
    CK_PASSWORD NUMBER:=0;
    REGEX_PASSWORD VARCHAR(33):='^[a-zA-Z0-9\.\#$%^*_-]{6,32}$';
    BEGIN
      SELECT REGEXP_INSTR (v_pass,REGEX_PASSWORD) INTO CK_PASSWORD
      FROM dual;
        IF CK_PASSWORD>0
      THEN
        RETURN TRUE;
      ELSE 
        RETURN FALSE;
      END IF;
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
    
      IF checkEmail(v_email)=TRUE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
      IF checkUsername(v_username)=TRUE THEN RAISE WRONG_USERNAME_FORMAT;END IF;
      IF checkPassword(v_pass)=TRUE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;

      INSERT INTO users(username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_username, v_pass, v_email,v_avatar, v_tip, v_data_nasterii, v_sex);
      EXCEPTION
      WHEN WRONG_EMAIL_FORMAT THEN
          DBMS_OUTPUT.PUT_LINE('Wrong email format for user '||v_username);
      WHEN WRONG_USERNAME_FORMAT THEN
        IF LENGTH(v_username)>25 THEN DBMS_OUTPUT.PUT_LINE('Username too long');
        ELSE DBMS_OUTPUT.PUT_LINE('Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]'));
        END IF;
      WHEN WRONG_PASSWORD_FORMAT THEN
        IF LENGTH(v_pass)>32 THEN DBMS_OUTPUT.PUT_LINE('Password too long');
        ELSE DBMS_OUTPUT.PUT_LINE('Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
        END IF;
    END insertUser;

--internal procedure for inserting user used when importing data from csv
  PROCEDURE insertUser (
    v_id IN users.id%TYPE,
    v_username IN  users.username%TYPE,
    v_pass IN  users.pass%TYPE,
    v_email IN  users.email%TYPE,
    v_avatar IN users.avatar%tYPE,
    v_tip IN  users.tip%TYPE,
    v_data_nasterii IN  users.data_nasterii%TYPE,
    v_sex IN  users.sex%TYPE) IS
    BEGIN
    
      IF userExistsName(v_username)=TRUE THEN RAISE USER_EXISTS_NAME;END IF;
      IF userExistsEmail(v_email)=TRUE THEN RAISE USER_EXISTS_EMAIL;END IF;
      IF checkEmail(v_email)=FALSE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
      IF checkUsername(v_username)=FALSE THEN RAISE WRONG_USERNAME_FORMAT;END IF;
      IF checkPassword(v_pass)=FALSE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;

      INSERT INTO users(id,username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_id,v_username, v_pass, v_email,v_avatar, v_tip, v_data_nasterii, v_sex);
      EXCEPTION
      WHEN USER_EXISTS_NAME THEN
        DBMS_OUTPUT.PUT_LINE('USERNAME ALREADY IN USE');
      WHEN USER_EXISTS_EMAIL THEN
        DBMS_OUTPUT.PUT_LINE('EMAIL ALREADY IN USE');
      WHEN WRONG_EMAIL_FORMAT THEN
        DBMS_OUTPUT.PUT_LINE('Wrong email format for user '||v_username);
      WHEN WRONG_USERNAME_FORMAT THEN
        IF LENGTH(v_username)>25 THEN DBMS_OUTPUT.PUT_LINE('Username too long');
        ELSE DBMS_OUTPUT.PUT_LINE('Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]'));
        END IF;
      WHEN WRONG_PASSWORD_FORMAT THEN
        IF LENGTH(v_pass)>32 THEN DBMS_OUTPUT.PUT_LINE('Password too long');
        ELSE DBMS_OUTPUT.PUT_LINE('Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
        END IF;
    END insertUser;

  PROCEDURE importFromCSV(input_file_name IN VARCHAR2 ) IS

    input_file UTL_FILE.FILE_TYPE;
    V_LINE VARCHAR2(1000);
    v_id users.id%TYPE;
    v_username users.username%TYPE;
    v_pass users.pass%TYPE;
    v_email users.email%TYPE;
    v_avatar users.avatar%TYPE;
    v_tip users.tip%TYPE;
    v_data_nasterii VARCHAR2(30);
    v_sex users.sex%TYPE;
    it NUMBER:=1;

    BEGIN

      input_file := UTL_FILE.FOPEN ('USER_DIR',input_file_name, 'R');
      EXECUTE IMMEDIATE 'ALTER  SESSION set NLS_DATE_FORMAT = ''DD-MM-YYYY''' ;
      IF UTL_FILE.IS_OPEN(input_file) THEN
      UTL_FILE.GET_LINE(input_file, V_LINE, 1000);--ignore the first line with header info
        LOOP
          BEGIN
            UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
            IF V_LINE IS NULL THEN
              EXIT;
            END IF;
            v_id:=REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
            v_username := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
            v_pass := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 3);
            v_email := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 4);
            v_avatar := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 5);
            v_tip := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 6);
            v_data_nasterii := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 7);
            v_sex := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 8);

            insertUser(v_id,v_username,v_pass,v_email,TO_NUMBER(v_avatar),TO_NUMBER(v_tip),TO_DATE(v_data_nasterii,'dd-mm-yyyy'),v_sex);
            it:=it+1;
            COMMIT;
            EXCEPTION
            WHEN DUP_VAL_ON_INDEX THEN
              DBMS_OUTPUT.PUT_LINE('USER ALREADY EXISTS');
              it:=it+1;
            WHEN WRONG_EMAIL_FORMAT THEN
              DBMS_OUTPUT.PUT_LINE('Wrong email format for user '||v_username||' at line '||it||' from file \\EDeC\sql\csv\'||input_file_name);
              it:=it+1;
            WHEN WRONG_USERNAME_FORMAT THEN
              IF LENGTH(v_username)>15 THEN DBMS_OUTPUT.PUT_LINE('Username too long');
                ELSE DBMS_OUTPUT.PUT_LINE('Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]')||' at line '||it);
              END IF;
              it:=it+1;
            WHEN WRONG_PASSWORD_FORMAT THEN
              IF LENGTH(v_pass)>32 THEN DBMS_OUTPUT.PUT_LINE('Password too long');
              ELSE DBMS_OUTPUT.PUT_LINE('Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]')||' at line '||it);
              END IF;
              it:=it+1;
            WHEN VALUE_ERROR THEN --when the file formar is wrong
              DBMS_OUTPUT.PUT_LINE('CSV file value error \\EDeC\sql\csv\'||input_file_name||' at  line '||it );
              DBMS_OUTPUT.PUT_LINE(V_LINE); 
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
    edec_utils_package.exportToCSV('users','users.csv');
  END exportToCSV;

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

  PROCEDURE populateLove(v_no_car IN NUMBER) AS
    CURSOR user_cursor IS
      SELECT id
      FROM users;

    user_rec user_cursor%ROWTYPE;
    --v_no_car NUMBER(3);
    BEGIN
      FOR user_rec in user_cursor LOOP

        --v_no_car:=TRUNC(dbms_random.value(1,max_car));

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

  PROCEDURE insertLove(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE) IS
  
  BEGIN
     INSERT INTO user_loves(id,user_id,caracteristica_id) VALUES (v_id,user_id,carac_id);
  END insertLove;

  PROCEDURE insertHate(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE) IS
  
  BEGIN
     INSERT INTO user_hates(id,user_id,caracteristica_id) VALUES (v_id,user_id,carac_id);
  END insertHate;
END edec_users_package;
/