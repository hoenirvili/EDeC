ALTER  SESSION set NLS_DATE_FORMAT = 'DD-MM-YYYY' ;

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
  PROCEDURE insertLove(V_user_id IN users.id%TYPE,V_carac_id IN caracteristica.id%TYPE);
--insereaza o caracteristica pt un user in tabela user hates
  PROCEDURE insertHate(V_user_id IN users.id%TYPE,V_carac_id IN caracteristica.id%TYPE);
  
  PROCEDURE insertLove(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);
  PROCEDURE insertHate(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE);
  
  PROCEDURE edit_user_username(new_username IN users.username%TYPE,v_user_id IN users.id%TYPE);
  PROCEDURE edit_user_pass(new_pass IN users.pass%TYPE,v_user_id IN users.id%TYPE);
  PROCEDURE edit_user_email(new_email IN users.email%TYPE,v_user_id IN users.id%TYPE);
  PROCEDURE edit_user_avatar(new_avatar IN users.avatar%TYPE,v_user_id IN users.id%TYPE);
  PROCEDURE edit_user_birthdate(new_birthdate IN users.data_nasterii%TYPE,v_user_id IN users.id%TYPE);
  PROCEDURE edit_user_type(new_type IN users.tip%TYPE,v_user_id IN users.id%TYPE);
  PROCEDURE edit_user_sex(new_sex IN users.sex%TYPE,v_user_id IN users.id%TYPE);
  PROCEDURE edit_user (
    v_user_id IN users.id%TYPE,
    new_username IN users.username%TYPE,
    new_pass IN  users.pass%TYPE,
    new_email IN  users.email%TYPE,
    new_avatar IN users.avatar%tYPE,
    new_type IN  users.tip%TYPE,
    new_birthdate IN  users.data_nasterii%TYPE,
    new_sex IN  users.sex%TYPE);
  PROCEDURE edit_user (
    v_user_id IN users.id%TYPE,
    new_pass IN  users.pass%TYPE,
    new_email IN  users.email%TYPE,
    new_avatar IN users.avatar%tYPE,
    new_birthdate IN  users.data_nasterii%TYPE,
    new_sex IN  users.sex%TYPE);
  
  PROCEDURE show_hate(v_id users.id%TYPE);
  PROCEDURE show_love(v_id users.id%TYPE);
  
  
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

  FUNCTION userExistsEmail(v_email IN users.email%TYPE,v_id users.id%TYPE) RETURN BOOLEAN IS
    v_count int:=0;
    BEGIN
      SELECT COUNT(*) INTO V_COUNT FROM USERS WHERE EMAIL=v_email AND id<>v_id;
      IF V_COUNT>0
      THEN
        return TRUE;
      ELSE
        return FALSE;
      END IF ;
    END userExistsEmail;

  FUNCTION userExistsName(v_name IN users.username%TYPE,v_id users.id%TYPE) RETURN BOOLEAN IS
    v_count int:=0;
    BEGIN
      SELECT COUNT(*) INTO V_COUNT FROM USERS WHERE username=v_name AND id<>v_id;
      IF V_COUNT>0
      THEN
        return TRUE;
      ELSE
        return FALSE;
      END IF ;
    END userExistsName;

   
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
    
      IF checkEmail(v_email)=FALSE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
      IF checkUsername(v_username)=FALSE THEN RAISE WRONG_USERNAME_FORMAT;END IF;
      IF checkPassword(v_pass)=FALSE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;
      IF userExistsName(v_username)=TRUE THEN RAISE USER_EXISTS_NAME;END IF;
      IF userExistsEmail(v_email)=TRUE THEN RAISE USER_EXISTS_EMAIL;END IF;

      INSERT INTO users(username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_username, v_pass, v_email,v_avatar, v_tip, v_data_nasterii, v_sex);
      EXCEPTION
      WHEN USER_EXISTS_NAME THEN
      raise_application_error(-20005,'USERNAME ALREADY IN USE');
      WHEN USER_EXISTS_EMAIL THEN
      raise_application_error(-20004,'EMAIL ALREADY IN USE');
      WHEN WRONG_EMAIL_FORMAT THEN
          raise_application_error(-20001,'Wrong email format for user '||v_username);
      WHEN WRONG_USERNAME_FORMAT THEN
        IF LENGTH(v_username)>25 THEN raise_application_error(-20002,'Username too long');END IF;
        IF LENGTH(v_username)<6 THEN raise_application_error(-20002,'Username too short');
        ELSE raise_application_error(-20002,'Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]'));
        END IF;

      WHEN WRONG_PASSWORD_FORMAT THEN
        IF LENGTH(v_pass)>32 THEN raise_application_error(-20003,'Password too long');END IF;
        IF LENGTH(v_pass)<6 THEN raise_application_error(-20003,'Password too short');
        ELSE raise_application_error(-20004,'Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
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
    
      IF checkEmail(v_email)=FALSE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
      IF checkUsername(v_username)=FALSE THEN RAISE WRONG_USERNAME_FORMAT;END IF;
      IF checkPassword(v_pass)=FALSE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;
      IF userExistsName(v_username)=TRUE THEN RAISE USER_EXISTS_NAME;END IF;
      IF userExistsEmail(v_email)=TRUE THEN RAISE USER_EXISTS_EMAIL;END IF;

      INSERT INTO users(id,username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_id,v_username, v_pass, v_email,v_avatar, v_tip, v_data_nasterii, v_sex);
      EXCEPTION
      WHEN USER_EXISTS_NAME THEN
      raise_application_error(-20005,'USERNAME ALREADY IN USE');
      WHEN USER_EXISTS_EMAIL THEN
      raise_application_error(-20004,'EMAIL ALREADY IN USE');
      WHEN WRONG_EMAIL_FORMAT THEN
      raise_application_error(-20001,'Wrong email format for user '||v_username);
      WHEN WRONG_USERNAME_FORMAT THEN
        IF LENGTH(v_username)>25 THEN raise_application_error(-20002,'Username too long');END IF;
        IF LENGTH(v_username)<6 THEN raise_application_error(-20002,'Username too short');
        ELSE raise_application_error(-20002,'Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]'));
        END IF;
      WHEN WRONG_PASSWORD_FORMAT THEN
        IF LENGTH(v_pass)>32 THEN raise_application_error(-20003,'Password too long');END IF;
        IF LENGTH(v_pass)<6 THEN raise_application_error(-20003,'Password too short');
        ELSE raise_application_error(-20003,'Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
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

            IF checkEmail(v_email)=FALSE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
            IF checkUsername(v_username)=FALSE THEN RAISE WRONG_USERNAME_FORMAT;END IF;
            IF checkPassword(v_pass)=FALSE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;
            IF userExistsName(v_username)=TRUE THEN RAISE USER_EXISTS_NAME;END IF;
            IF userExistsEmail(v_email)=TRUE THEN RAISE USER_EXISTS_EMAIL;END IF;
            
            insertUser(v_id,v_username,v_pass,v_email,TO_NUMBER(v_avatar),TO_NUMBER(v_tip),TO_DATE(v_data_nasterii,'dd-mm-yyyy'),v_sex);
            it:=it+1;
            COMMIT;
            EXCEPTION
            WHEN DUP_VAL_ON_INDEX THEN
              raise_application_error(-20006,'USER ALREADY EXISTS IN THE DATABASE');
              it:=it+1;
            WHEN WRONG_EMAIL_FORMAT THEN
              raise_application_error(-20001,'Wrong email format for user '||v_username||' at line '||it||' from file \\EDeC\sql\csv\'||input_file_name);
              it:=it+1;
            WHEN WRONG_USERNAME_FORMAT THEN
              IF LENGTH(v_username)>15 THEN raise_application_error(-20002,'Username too long');END IF;
              IF LENGTH(v_username)<6 THEN raise_application_error(-20002,'Username too short');
                ELSE raise_application_error(-20003,'Wrong username: invalid character used '||REGEXP_SUBSTR(v_username,'[^a-zA-Z0-9\._-]')||' at line '||it);
              END IF;
              it:=it+1;
            WHEN WRONG_PASSWORD_FORMAT THEN
              IF LENGTH(v_pass)>32 THEN raise_application_error(-20003,'Password too long');END IF;
              IF LENGTH(v_pass)<6 THEN raise_application_error(-20003,'Password too short');
              ELSE raise_application_error(-20016,'Wrong password: invalid character used '||REGEXP_SUBSTR(v_pass,'[^a-zA-Z0-9\.\#$%^*_-]')||' at line '||it);
              END IF;
              it:=it+1;
            WHEN VALUE_ERROR THEN --when the file formar is wrong
              raise_application_error(-20007,'CSV file value error \\EDeC\sql\csv\'||input_file_name||' at  line '||it ||V_LINE);
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

  PROCEDURE insertLove(V_user_id IN users.id%TYPE,V_carac_id IN caracteristica.id%TYPE)
  IS
    v_check user_loves.id%TYPE:=-1;
    
    BEGIN
      SELECT ID INTO v_check
      FROM USER_LOVES WHERE user_id=V_user_id AND caracteristica_id=V_carac_id;
      IF(v_check >0)THEN
      INSERT INTO user_loves(user_id,caracteristica_id) VALUES (V_user_id,V_carac_id);
      END IF;
    END insertLove;

  PROCEDURE insertHate(V_user_id IN users.id%TYPE,V_carac_id IN caracteristica.id%TYPE)
  IS
  v_check user_loves.id%TYPE:=-1;
    BEGIN
     SELECT ID INTO v_check
      FROM USER_LOVES WHERE user_id=V_user_id AND caracteristica_id=V_carac_id;
      IF(v_check >0)THEN
      INSERT INTO user_hates(user_id,caracteristica_id) VALUES (V_user_id,V_carac_id);
      END IF;
    END insertHate;

  PROCEDURE insertLove(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE) IS
  
  BEGIN
     INSERT INTO user_loves(id,user_id,caracteristica_id) VALUES (v_id,user_id,carac_id);
  END insertLove;

  PROCEDURE insertHate(v_id user_hates.id%TYPE,user_id IN users.id%TYPE,carac_id IN caracteristica.id%TYPE) IS
  
  BEGIN
     INSERT INTO user_hates(id,user_id,caracteristica_id) VALUES (v_id,user_id,carac_id);
  END insertHate;
  
   PROCEDURE show_hate(v_id users.id%TYPE) AS
    CURSOR hate_c IS
    SELECT name 
    FROM caracteristica car JOIN user_hates uh
    ON car.id=uh.caracteristica_id
    WHERE uh.user_id=v_id;
    hate_rec hate_c%ROWTYPE;
  BEGIN
    FOR hate_rec IN hate_c LOOP
      raise_application_error(-20009,hate_rec.name);
    END LOOP;
  END show_hate;
  
  PROCEDURE show_love(v_id users.id%TYPE) AS
    CURSOR love_c IS
    SELECT name 
    FROM caracteristica car JOIN user_loves ul
    ON car.id=ul.caracteristica_id
    WHERE ul.user_id=v_id;
    love_rec love_c%ROWTYPE;
  BEGIN
    FOR love_rec IN love_c LOOP
      raise_application_error(-20008,love_rec.name);
    END LOOP;
  END show_love;
  
PROCEDURE edit_user_username
        (new_username IN users.username%TYPE,v_user_id IN users.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM users 
      WHERE v_user_id=users.id  
      FOR UPDATE OF users.username;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      IF checkUsername(new_username)=FALSE THEN RAISE WRONG_USERNAME_FORMAT;END IF;
      IF userExistsName(new_username,v_user_id)=TRUE THEN RAISE USER_EXISTS_NAME;END IF;
      UPDATE
      users SET users.username=new_username
      WHERE CURRENT OF update_cursor;
    END LOOP;
    EXCEPTION
     WHEN USER_EXISTS_NAME THEN
      raise_application_error(-20005,'USERNAME ALREADY IN USE');
    WHEN WRONG_USERNAME_FORMAT THEN
        IF LENGTH(new_username)>25 THEN raise_application_error(-20002,'Username too long');END IF;
        IF LENGTH(new_username)<6 THEN raise_application_error(-20002,'Username too short');
        ELSE raise_application_error(-20002,'Wrong username: invalid character used '||REGEXP_SUBSTR(new_username,'[^a-zA-Z0-9\._-]'));
        END IF;
END edit_user_username;

  
PROCEDURE edit_user_pass
        (new_pass IN users.pass%TYPE,v_user_id IN users.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM users 
      WHERE v_user_id=users.id  
      FOR UPDATE OF users.pass;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      IF checkPassword(new_pass)=FALSE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;
      UPDATE
      users SET users.pass=new_pass 
      WHERE CURRENT OF update_cursor;
    END LOOP;
    EXCEPTION
      WHEN WRONG_PASSWORD_FORMAT THEN
              IF LENGTH(new_pass)>32 THEN raise_application_error(-20003,'Password too long');END IF;
              IF LENGTH(new_pass)<6 THEN raise_application_error(-20003,'Password too short');
              ELSE raise_application_error(-20016,'Wrong password: invalid character used '||REGEXP_SUBSTR(new_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
              END IF;
END edit_user_pass;

PROCEDURE edit_user_email
        (new_email IN users.email%TYPE,v_user_id IN users.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM users 
      WHERE v_user_id=users.id  
      FOR UPDATE OF users.email;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      IF checkEmail(new_email)=FALSE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
      IF userExistsEmail(new_email,v_user_id)=TRUE THEN RAISE USER_EXISTS_EMAIL;END IF;
      UPDATE
      users SET users.email=new_email 
      WHERE CURRENT OF update_cursor;
    END LOOP;
    EXCEPTION
      WHEN USER_EXISTS_EMAIL THEN
      raise_application_error(-20004,'EMAIL ALREADY IN USE');
      WHEN WRONG_EMAIL_FORMAT THEN
      raise_application_error(-20001,'Wrong email format for user '|| v_user_id );
END edit_user_email;

PROCEDURE edit_user_avatar
        (new_avatar IN users.avatar%TYPE,v_user_id IN users.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM users 
      WHERE v_user_id=users.id  
      FOR UPDATE OF users.avatar;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      users SET users.avatar=new_avatar 
      WHERE CURRENT OF update_cursor;
    END LOOP;
   
END edit_user_avatar;

PROCEDURE edit_user_birthdate
        (new_birthdate IN users.data_nasterii%TYPE,v_user_id IN users.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM users 
      WHERE v_user_id=users.id  
      FOR UPDATE OF users.data_nasterii;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      users SET users.data_nasterii=new_birthdate 
      WHERE CURRENT OF update_cursor;
    END LOOP;
   
END edit_user_birthdate;

PROCEDURE edit_user_type
        (new_type IN users.tip%TYPE,v_user_id IN users.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM users 
      WHERE v_user_id=users.id  
      FOR UPDATE OF users.tip;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      users SET users.tip=new_type 
      WHERE CURRENT OF update_cursor;
    END LOOP;
   
END edit_user_type;

PROCEDURE edit_user_sex
        (new_sex IN users.sex%TYPE,v_user_id IN users.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM users 
      WHERE v_user_id=users.id  
      FOR UPDATE OF users.sex;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      users SET users.sex=new_sex
      WHERE CURRENT OF update_cursor;
    END LOOP;
   
END edit_user_sex;

 PROCEDURE edit_user (
    v_user_id IN users.id%TYPE,
    new_username IN users.username%TYPE,
    new_pass IN  users.pass%TYPE,
    new_email IN  users.email%TYPE,
    new_avatar IN users.avatar%tYPE,
    new_type IN  users.tip%TYPE,
    new_birthdate IN  users.data_nasterii%TYPE,
    new_sex IN  users.sex%TYPE) IS
    
  BEGIN
  
    IF checkEmail(new_email)=FALSE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
    IF checkUsername(new_username)=FALSE THEN RAISE WRONG_USERNAME_FORMAT;END IF;
    IF checkPassword(new_pass)=FALSE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;
    IF userExistsName(new_username,v_user_id)=TRUE THEN RAISE USER_EXISTS_NAME;END IF;
    IF userExistsEmail(new_email,v_user_id)=TRUE THEN RAISE USER_EXISTS_EMAIL;END IF;
            
    edit_user_username(new_username,v_user_id);
    edit_user_pass(new_pass,v_user_id);
    edit_user_email(new_email,v_user_id);
    edit_user_avatar(new_avatar,v_user_id);
    edit_user_type(new_type,v_user_id);
    edit_user_birthdate(new_birthdate,v_user_id);
    edit_user_sex(new_sex,v_user_id);
    
     EXCEPTION
      WHEN USER_EXISTS_NAME THEN
        raise_application_error(-20005,'USERNAME ALREADY IN USE');
      WHEN USER_EXISTS_EMAIL THEN
        raise_application_error(-20004,'EMAIL ALREADY IN USE');
      WHEN WRONG_EMAIL_FORMAT THEN
        raise_application_error(-20001,'Wrong email format for user '||new_username);
      WHEN WRONG_USERNAME_FORMAT THEN
        IF LENGTH(new_username)>15 THEN raise_application_error(-20002,'Username too long');END IF;
        IF LENGTH(new_username)<6 THEN raise_application_error(-20002,'Username too short');
        ELSE raise_application_error(-20003,'Wrong username: invalid character used '||REGEXP_SUBSTR(new_username,'[^a-zA-Z0-9\._-]'));
        END IF;
      WHEN WRONG_PASSWORD_FORMAT THEN
        IF LENGTH(new_pass)>32 THEN raise_application_error(-20003,'Password too long');END IF;
        IF LENGTH(new_pass)<6 THEN raise_application_error(-20003,'Password too short');
        ELSE raise_application_error(-20016,'Wrong password: invalid character used '||REGEXP_SUBSTR(new_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
        END IF;
  END edit_user;
  
  PROCEDURE edit_user (
    v_user_id IN users.id%TYPE,
    new_pass IN  users.pass%TYPE,
    new_email IN  users.email%TYPE,
    new_avatar IN users.avatar%tYPE,
    new_birthdate IN  users.data_nasterii%TYPE,
    new_sex IN  users.sex%TYPE) IS
    
  BEGIN
    IF checkEmail(new_email)=FALSE THEN RAISE WRONG_EMAIL_FORMAT;END IF;
    IF checkPassword(new_pass)=FALSE THEN RAISE WRONG_PASSWORD_FORMAT;END IF;
    IF userExistsEmail(new_email,v_user_id)=TRUE THEN RAISE USER_EXISTS_EMAIL;END IF;
            
    edit_user_pass(new_pass,v_user_id);
    edit_user_email(new_email,v_user_id);
    edit_user_avatar(new_avatar,v_user_id);
    edit_user_birthdate(new_birthdate,v_user_id);
    edit_user_sex(new_sex,v_user_id);
    
    EXCEPTION
      WHEN USER_EXISTS_EMAIL THEN
        raise_application_error(-20004,'EMAIL ALREADY IN USE');
      WHEN WRONG_EMAIL_FORMAT THEN
        raise_application_error(-20001,'Wrong email format for user '||v_user_id);
      WHEN WRONG_PASSWORD_FORMAT THEN
        IF LENGTH(new_pass)>32 THEN raise_application_error(-20003,'Password too long');END IF;
        IF LENGTH(new_pass)<6 THEN raise_application_error(-20003,'Password too short');
        ELSE raise_application_error(-20016,'Wrong password: invalid character used '||REGEXP_SUBSTR(new_pass,'[^a-zA-Z0-9\.\#$%^*_-]'));
        END IF;
  END edit_user;


END edec_users_package;
/