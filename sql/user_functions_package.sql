SET SERVEROUTPUT ON;

CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

CREATE OR REPLACE PACKAGE user_functions_package AS

  PROCEDURE show_hate(v_id users.id%TYPE);
  PROCEDURE show_love(v_id users.id%TYPE);
  
  

END user_functions_package;
/

CREATE OR REPLACE PACKAGE BODY user_functions_package AS

  PROCEDURE show_hate(v_id users.id%TYPE) AS
    CURSOR hate_c IS
    SELECT name 
    FROM caracteristica car JOIN user_hates uh
    ON car.id=uh.caracteristica_id
    WHERE uh.user_id=v_id;
    hate_rec hate_c%ROWTYPE;
  BEGIN
    FOR hate_rec IN hate_c LOOP
      DBMS_OUTPUT.PUT_LINE(hate_rec.name);
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
      DBMS_OUTPUT.PUT_LINE(love_rec.name);
    END LOOP;
  END show_love;


END user_functions_package;
/