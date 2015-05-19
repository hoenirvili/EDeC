SET SERVEROUTPUT ON;

--seteaza directorul ?
CREATE OR REPLACE DIRECTORY USER_DIR AS 'C:\wamp\EDeC\sql\csv';
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

--pachet tabele caracteristici
CREATE OR REPLACE PACKAGE edec_caracteristici_package IS

  PROCEDURE importFromCSV(input_file_name IN VARCHAR2) ;

  PROCEDURE insertCaracteristica(c_name caracteristica.name%TYPE,c_cat caracteristica.categorie_caracteristici_id%TYPE);

  PROCEDURE exportToCSV ;
END edec_caracteristici_package;
/

CREATE OR REPLACE PACKAGE BODY edec_caracteristici_package IS

--forward declaration
--insereaza un rand in tabela categorie_caracteristici
  PROCEDURE insertCategory(v_name IN categorie_caracteristici.nume%TYPE);
  PROCEDURE insertCategory(v_id IN categorie_caracteristici.id%TYPE,v_name IN categorie_caracteristici.nume%TYPE);
--insereaza un rand cu date despre o organizatie in tabela caracteristica
  PROCEDURE insertOrganisation(organisation_name IN caracteristica.name%TYPE);
--insereaza un rand cu date despre o substanta alimentara in tabela caracteristica
  PROCEDURE insertSubst_alim(alim_name IN caracteristica.name%TYPE);
--insereaza un rand cu date despre o sustanta nealimentara in tabela caracteristica
  PROCEDURE insertSubst_nealim(nealim_name IN caracteristica.name%TYPE);
--insereaza un rand cu date despre un oras in tabela caracteristica
  PROCEDURE insertCity(city_name IN caracteristica.name%TYPE);

  PROCEDURE populateCategories IS
    BEGIN

      insertCategory(1,'ORGANIZATII');
      insertCategory(2,'SUBSTANTE ALIMENTARE');
      insertCategory(3,'SUBSTANTE NEALIMENTARE');
      insertCategory(4,'ORASE');
     
    END populateCategories;

  PROCEDURE insertCategory(v_name IN categorie_caracteristici.nume%TYPE) AS
    BEGIN

      INSERT INTO categorie_caracteristici(NUME) VALUES (v_name);
      
    END insertCategory;
    
   PROCEDURE insertCategory(v_id IN categorie_caracteristici.id%TYPE,v_name IN categorie_caracteristici.nume%TYPE) AS
    BEGIN

      INSERT INTO categorie_caracteristici(ID,NUME) VALUES (v_id,v_name);
    EXCEPTION
      WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Caracteristic CATEGORY already exists');
    END insertCategory;

  PROCEDURE insertOrganisation(organisation_name IN caracteristica.name%TYPE) AS
    BEGIN

      INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (organisation_name,1);

    END insertOrganisation;

  PROCEDURE insertSubst_alim(alim_name IN caracteristica.name%TYPE) AS

    BEGIN

      INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (alim_name,2);

    END insertSubst_alim;

  PROCEDURE insertSubst_nealim(nealim_name IN caracteristica.name%TYPE) AS
    BEGIN

      INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (nealim_name,3);

    END insertSubst_nealim;

  PROCEDURE insertCity(city_name IN caracteristica.name%TYPE)AS
    BEGIN

      INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (city_name,4);

    END insertCity;

  PROCEDURE insertCaracteristica(c_name caracteristica.name%TYPE,c_cat caracteristica.categorie_caracteristici_id%TYPE)
  IS
    BEGIN

      INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (c_name,c_cat);

    END insertCaracteristica;

    PROCEDURE insertCaracteristica(v_id caracteristica.id%TYPE,v_name caracteristica.name%TYPE,v_categorie caracteristica.categorie_caracteristici_id%TYPE)
  IS
    BEGIN

      INSERT INTO caracteristica(ID,NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (v_id,v_name,v_categorie);

    END insertCaracteristica;

  PROCEDURE importFromCSV(input_file_name IN VARCHAR2 ) IS

    input_file UTL_FILE.FILE_TYPE;
    V_LINE VARCHAR2(1000);
    v_id caracteristica.id%TYPE;
    v_name caracteristica.name%TYPE;
    v_categorie caracteristica.CATEGORIE_CARACTERISTICI_ID%TYPE;
    it NUMBER:=1;
    v_count NUMBER;
    BEGIN
      populateCategories;
      
      input_file := UTL_FILE.FOPEN ('USER_DIR',input_file_name, 'R');
      IF UTL_FILE.IS_OPEN(input_file) THEN
      UTL_FILE.GET_LINE(input_file, V_LINE, 1000);--ignore the first line with header info
        LOOP
          BEGIN
            UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
            IF V_LINE IS NULL THEN
              EXIT;
            END IF;
            SELECT LENGTH(V_LINE)-LENGTH(REPLACE(V_LINE,','))INTO v_count FROM DUAL;
            v_id:=REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
            v_categorie := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, v_count+1);
            v_name := SUBSTR(V_LINE,LENGTH(v_id)+2,LENGTH(V_LINE)-(LENGTH(v_id)+LENGTH(v_categorie))-2);
            
            insertCaracteristica(TO_NUMBER(v_id),v_name,TO_NUMBER(v_categorie));
            it:=it+1;
            COMMIT;
            EXCEPTION
            WHEN DUP_VAL_ON_INDEX THEN
              DBMS_OUTPUT.PUT_LINE('Caracteristic already exists');
              it:=it+1;
            WHEN VALUE_ERROR THEN --when the file formar is wrong
              DBMS_OUTPUT.PUT_LINE('CSV file value error \\EDeC\sql\csv\'||input_file_name||' at  line '||it );
              DBMS_OUTPUT.PUT_LINE(V_LINE); 
              ROLLBACK;--rollback any changes so far
              EXIT;--exit procedure
            WHEN NO_DATA_FOUND THEN
            EXIT;
           --  WHEN OTHERS  THEN
          --     DBMS_OUTPUT.PUT_LINE('Error AT LINE'||it);
         --      DBMS_OUTPUT.PUT_LINE(V_LINE);
         --      DBMS_OUTPUT.PUT_LINE(v_id||' '||v_name||' '||v_categorie);
         --      it:=it+1;
          END;
        END LOOP;
      END IF;
      UTL_FILE.FCLOSE(input_file);

    END importFromCSV;

  PROCEDURE exportToCSV IS
  BEGIN
    edec_utils_package.exportToCSV('caracteristica','caracteristica.csv');
  END exportToCSV;
   
END edec_caracteristici_package;
/

