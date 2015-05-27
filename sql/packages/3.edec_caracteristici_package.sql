
--pachet tabele caracteristici
CREATE OR REPLACE PACKAGE edec_caracteristici_package IS

  PROCEDURE importFromCSV(input_file_name IN VARCHAR2) ;
  PROCEDURE insertCaracteristica(c_name caracteristica.name%TYPE,c_cat caracteristica.categorie_caracteristici_id%TYPE);
  PROCEDURE exportToCSV ;
  
  PROCEDURE edit_caracteristica_name(new_name IN caracteristica.name%TYPE,v_caracteristica_id IN caracteristica.id%TYPE);
  PROCEDURE edit_caracteristica_category(new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.ID%TYPE);
  PROCEDURE edit_caracteristica (new_name IN caracteristica.name%TYPE,new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.ID%TYPE);
  PROCEDURE edit_categorie_name(new_name IN CATEGORIE_CARACTERISTICI.nume%TYPE,v_categorie_id IN CATEGORIE_CARACTERISTICI.id%TYPE);
  
  --functions used for the statistics part
  FUNCTION get_hate_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR;
  FUNCTION get_love_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR;
  --FUNCTION get_hate_stats(car_no IN NUMBER,) RETURN SYS_REFCURSOR;
  FUNCTION get_love_stats(car_no IN NUMBER,v_category_name categorie_caracteristici.nume%TYPE) RETURN SYS_REFCURSOR;
END edec_caracteristici_package;
/

CREATE OR REPLACE PACKAGE BODY edec_caracteristici_package IS

--forward declaration
--insereaza un rand in tabela categorie_caracteristici
  PROCEDURE insertCategory(v_name IN categorie_caracteristici.nume%TYPE);
  PROCEDURE insertCategory(v_id IN categorie_caracteristici.id%TYPE,v_name IN categorie_caracteristici.nume%TYPE);

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
        raise_application_error(-20024,'Caracteristic CATEGORY already exists');
    END insertCategory;

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

  PROCEDURE edit_caracteristica_name
      (new_name IN caracteristica.name%TYPE,v_caracteristica_id IN caracteristica.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM caracteristica 
      WHERE caracteristica.id=v_caracteristica_id
      FOR UPDATE OF caracteristica.name;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      caracteristica SET caracteristica.name=new_name 
      WHERE CURRENT OF update_cursor;
    END LOOP;
END edit_caracteristica_name;

  PROCEDURE edit_caracteristica_category
      (new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.ID%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM caracteristica 
      WHERE caracteristica.id=v_caracteristica_id
      FOR UPDATE OF caracteristica.CATEGORIE_CARACTERISTICI_ID;
      v_category_id CATEGORIE_CARACTERISTICI.ID%TYPE;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      SELECT ID INTO v_category_id
        FROM  CATEGORIE_CARACTERISTICI
        WHERE ID=new_category;
      
      UPDATE 
      caracteristica SET caracteristica.CATEGORIE_CARACTERISTICI_ID=v_category_id 
      WHERE CURRENT OF update_cursor;
      
    END LOOP;
END edit_caracteristica_category;

PROCEDURE edit_caracteristica
      (new_name IN caracteristica.name%TYPE,new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.ID%TYPE)IS
      
   BEGIN
    edit_caracteristica_name(new_name,v_caracteristica_id);
    edit_caracteristica_category(new_category,v_caracteristica_id);
      
END edit_caracteristica;

PROCEDURE edit_categorie_name
      (new_name IN CATEGORIE_CARACTERISTICI.nume%TYPE,v_categorie_id IN CATEGORIE_CARACTERISTICI.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM CATEGORIE_CARACTERISTICI 
      WHERE v_categorie_id=CATEGORIE_CARACTERISTICI.id  
      FOR UPDATE OF CATEGORIE_CARACTERISTICI.nume;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      CATEGORIE_CARACTERISTICI SET CATEGORIE_CARACTERISTICI.nume=new_name 
      WHERE CURRENT OF update_cursor;
    END LOOP;
END edit_categorie_name;

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
              raise_application_error(-20025,'Caracteristic already exists');
              it:=it+1;
            WHEN VALUE_ERROR THEN --when the file formar is wrong
              raise_application_error(-20026,'CSV file value error \\EDeC\sql\csv\'||input_file_name||' at  line '||it );
              raise_application_error(-20027,V_LINE);
              ROLLBACK;--rollback any changes so far
              EXIT;--exit procedure
            WHEN NO_DATA_FOUND THEN
            EXIT;
           --  WHEN OTHERS  THEN
          --     raise_application_error(-20028,'Error AT LINE'||it);
         --      raise_application_error(-20029,V_LINE);
         --      raise_application_error(-20030,v_id||' '||v_name||' '||v_categorie);
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
  
    FUNCTION get_hate_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR IS
    hate_cursor SYS_REFCURSOR;
  BEGIN
    OPEN hate_cursor FOR SELECT * FROM view_statistics_hate WHERE ROWNUM <=car_no;
    RETURN hate_cursor;
  END get_hate_stats;
  
  FUNCTION get_love_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR IS
    love_cursor SYS_REFCURSOR;
  BEGIN
    OPEN love_cursor FOR SELECT * FROM view_statistics_love WHERE ROWNUM <=car_no;
    RETURN love_cursor;
  END get_love_stats;
  
FUNCTION get_love_stats(car_no IN NUMBER,v_category_name categorie_caracteristici.nume%TYPE) RETURN SYS_REFCURSOR IS
   love_cursor SYS_REFCURSOR;
   WRONG_CATEGORY_NAME EXCEPTION;
  BEGIN
  
    IF((v_category_name='ORGANIZATII') OR (v_category_name='ORGANIZATIONS'))THEN  
        OPEN love_cursor FOR SELECT * FROM view_Stats_Love_Org WHERE ROWNUM <=car_no;
         RETURN love_cursor;
    END IF;
    
    IF((v_category_name='SUBSTANTE ALIMENTARE') OR (v_category_name='ALIMENTE') OR (v_category_name='FOOD SUBSTANCES'))THEN
        OPEN love_cursor FOR SELECT * FROM view_Stats_Love_SubsAlim WHERE ROWNUM <=car_no;
         RETURN love_cursor;
    END IF;
    
    IF((v_category_name='SUBSTANTE NEALIMENTARE') OR (v_category_name='CHIMICALE') OR (v_category_name='CHEMICALS'))THEN
        OPEN love_cursor FOR SELECT * FROM view_Stats_Love_SubsNealim WHERE ROWNUM <=car_no;
         RETURN love_cursor;
    END IF;
    
    IF((v_category_name='ORASE') OR (v_category_name='CITIES'))THEN
        OPEN love_cursor FOR SELECT * FROM view_Stats_Love_Cities WHERE ROWNUM <=car_no;
         RETURN love_cursor;
    END IF;  
    
        RAISE WRONG_CATEGORY_NAME;
        
    EXCEPTION
    WHEN WRONG_CATEGORY_NAME THEN
    raise_application_error(-20020,'Wrong CATEGORY NAME');
  END get_love_stats;
   
  
END EDEC_CARACTERISTICI_PACKAGE;
/

