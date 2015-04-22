CREATE OR REPLACE PACKAGE edec_users AS
PROCEDURE insertUser (
    v_username IN  users.username%TYPE,
    v_passwd IN  users.pass%TYPE,
    v_email IN  users.email%TYPE,
    v_av IN users.avatar%tYPE,
    v_usertype IN  users.tip%TYPE,
    v_birthdate IN  users.data_nasterii%TYPE,
    v_sex IN  users.sex%TYPE);
PROCEDURE populateUsers;
END edec_users;
/
  
CREATE OR REPLACE PACKAGE BODY edec_users AS
PROCEDURE insertUser (
    v_username IN  users.username%TYPE,
    v_passwd IN  users.pass%TYPE,
    v_email IN  users.email%TYPE,
    v_av IN users.avatar%tYPE,
    v_usertype IN  users.tip%TYPE,
    v_birthdate IN  users.data_nasterii%TYPE,
    v_sex IN  users.sex%TYPE) IS
BEGIN
    INSERT INTO users(username, pass, email,avatar, tip, data_nasterii, sex) VALUES (v_username, v_passwd, v_email,v_av, v_usertype, v_birthdate, v_sex);
END insertUser; 
  
PROCEDURE populateUsers IS
BEGIN
    insertUser('anca_dorneanu','ancablabla','anca.dorneanu@info.uaic.ro',1,2,TO_DATE('21-07-1994'),'F');
    insertUser('ionutcalara','parola123','ionut.calara@info.uaic.ro',2,2,TO_DATE('30-11-1993'),'M');
    insertUser('tutuianu.c','incorrectpassword','corneliu.tutuianu@info.uaic.ro',3,2,TO_DATE('01-05-1994'),'M');
    insertUser('toto_salvatore','archlinuxftw234','giulitti.salvatore@info.uaic.ro',4,2,TO_DATE('02-01-1994'),'M');
    insertUser('random_user5','mypasswordis1234','random_email@gmail.com',5,1,TO_DATE('17-12-1995'),'F');
END populateUsers;
END edec_users;
/
  
BEGIN
   edec_users.populateUsers;
END;
