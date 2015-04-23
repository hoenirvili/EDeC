SET SERVEROUTPUT ON;

--seteaza directorul ?
CREATE OR REPLACE DIRECTORY USER_DIR AS 'D:\UAIC-COMPUTERSCIENCE\UAIC\ANII-SEM2\TW\EDEC\SRC\SQL\CSV'; 
GRANT READ ON DIRECTORY USER_DIR TO PUBLIC;

--pachet tabele caracteristici
CREATE OR REPLACE PACKAGE edec_caracteristici IS

PROCEDURE populate ;

END edec_caracteristici;
/

CREATE OR REPLACE PACKAGE BODY edec_caracteristici IS

--forward declaration
--populeaza tabela categorie_caracteristici 
PROCEDURE populate_categories;
--insereaza un rand in tabela categorie_caracteristici
PROCEDURE insert_category(category_name IN categorie_caracteristici.nume%TYPE);

--populeaza tabela caracteristica cu caracteristici legate de organizatii
PROCEDURE populate_organisations;
--insereaza un rand cu date despre o organizatie in tabela caracteristica
PROCEDURE insert_organisation(organisation_name IN caracteristica.name%TYPE);

--populeaza tabela caracteristica cu caracteristici legate de substante alimentare
PROCEDURE populate_subst_alim;
--insereaza un rand cu date despre o substanta alimentara in tabela caracteristica
PROCEDURE insert_subst_alim(alim_name IN caracteristica.name%TYPE);


--populeaza tabela caracteristica cu caracteristici legate de substante nealimentare
PROCEDURE populate_subst_nealim;
--insereaza un rand cu date despre o sustanta nealimentara in tabela caracteristica
PROCEDURE insert_subst_nealim(nealim_name IN caracteristica.name%TYPE);

--populeaza tabela caracteristica cu caracteristici legate de orase
PROCEDURE populate_cities;
--insereaza un rand cu date despre un oras in tabela caracteristica
PROCEDURE insert_city(city_name IN caracteristica.name%TYPE);

PROCEDURE populate IS
BEGIN
  populate_categories;
  populate_organisations;
  populate_subst_alim;
  populate_subst_nealim;
  populate_cities;

END populate;

PROCEDURE populate_categories IS
BEGIN
   insert_category('ORGANIZATII');
   insert_category('SUBSTANTE ALIMENTARE');
   insert_category('SUBSTANTE NEALIMENTARE');
   insert_category('ORASE');
 END populate_categories;

PROCEDURE insert_category(category_name IN categorie_caracteristici.nume%TYPE) AS
BEGIN
  INSERT INTO categorie_caracteristici(NUME) VALUES (category_name);
END insert_category;

PROCEDURE populate_organisations AS
  org_name caracteristica.name%TYPE;
  input_file UTL_FILE.FILE_TYPE; 
BEGIN
  input_file := UTL_FILE.FOPEN('USER_DIR','organizations_csv.txt','R'); 
  LOOP
    BEGIN
      UTL_FILE.GET_LINE(input_file,org_name); 
      insert_organisation(org_name);
    EXCEPTION WHEN No_Data_Found THEN EXIT; END;
  END LOOP;
END populate_organisations;

PROCEDURE insert_organisation(organisation_name IN caracteristica.name%TYPE) AS
BEGIN
 INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (organisation_name,1);
END insert_organisation;

PROCEDURE populate_subst_alim AS
  alim_name caracteristica.name%TYPE;
  input_file UTL_FILE.FILE_TYPE; 
BEGIN
  input_file := UTL_FILE.FOPEN('USER_DIR','subst_alim_csv.txt','R'); 
  
  LOOP
    BEGIN
      UTL_FILE.GET_LINE(input_file,alim_name); 
      insert_subst_alim(alim_name);
    EXCEPTION WHEN No_Data_Found THEN EXIT; END;
  END LOOP;
END populate_subst_alim;

PROCEDURE insert_subst_alim(alim_name IN caracteristica.name%TYPE) AS
BEGIN
  INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (alim_name,2);
END insert_subst_alim;

PROCEDURE populate_subst_nealim AS
  nealim_name caracteristica.name%TYPE;
  input_file UTL_FILE.FILE_TYPE; 
BEGIN
  input_file := UTL_FILE.FOPEN('USER_DIR','chemicals_csv.txt','R'); 
  LOOP
    BEGIN
      UTL_FILE.GET_LINE(input_file,nealim_name); 
      insert_subst_nealim(nealim_name);
    EXCEPTION WHEN No_Data_Found THEN EXIT; END;
  END LOOP;
END populate_subst_nealim;

PROCEDURE insert_subst_nealim(nealim_name IN caracteristica.name%TYPE) AS
BEGIN
  INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (nealim_name,3);
END insert_subst_nealim;

PROCEDURE populate_cities AS
  city_name caracteristica.name%TYPE;
  input_file UTL_FILE.FILE_TYPE; 
BEGIN
  input_file := UTL_FILE.FOPEN('USER_DIR','cities_csv.txt','R'); 
  
  LOOP
    BEGIN
      UTL_FILE.GET_LINE(input_file,city_name); 
      insert_city(city_name);
    EXCEPTION WHEN No_Data_Found THEN EXIT; END;
  END LOOP;
END populate_cities;

PROCEDURE insert_city(city_name IN caracteristica.name%TYPE)AS
BEGIN
  INSERT INTO caracteristica(NAME,CATEGORIE_CARACTERISTICI_ID) VALUES (city_name,4);
END insert_city;

END edec_caracteristici;
/

BEGIN
  edec_caracteristici.populate;
END;