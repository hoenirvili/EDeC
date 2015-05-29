
CREATE OR REPLACE PACKAGE edec_produse_package IS

  PROCEDURE importFromCSV(input_file_name IN VARCHAR2) ;
  PROCEDURE exportToCSV;
  PROCEDURE generateCaracteristics(max_car IN NUMBER);
  PROCEDURE insertProduct(v_name IN produs.name%TYPE,v_image_id IN produs.image%TYPE );
  PROCEDURE insertCarProd(v_id IN CARACTERISTICI_PRODUSE.id%TYPE,
                            v_prod_id IN CARACTERISTICI_PRODUSE.produs_id%TYPE,
                            v_car_id IN CARACTERISTICI_PRODUSE.caracteristica_id%TYPE);
  PROCEDURE insertCarProd(v_prod_id IN CARACTERISTICI_PRODUSE.produs_id%TYPE,
                            v_car_id IN CARACTERISTICI_PRODUSE.caracteristica_id%TYPE);
                            
  PROCEDURE edit_produs_name(new_name IN produs.name%TYPE,v_product_id IN produs.id%TYPE);
  PROCEDURE edit_product_image(new_image IN produs.image%TYPE,v_product_id IN produs.id%TYPE);
  PROCEDURE edit_product(new_name IN produs.name%TYPE,new_image IN produs.image%TYPE,v_product_id IN produs.id%TYPE);
  
  PROCEDURE edit_caract_name_prod(new_name IN caracteristica.name%TYPE,v_caracteristica_id IN caracteristica.id%TYPE,v_product_id IN produs.id%TYPE);
  PROCEDURE edit_caract_categ_prod(new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.id%TYPE,v_product_id IN produs.id%TYPE);
  PROCEDURE edit_caract_prod(new_name IN caracteristica.name%TYPE,new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.id%TYPE,v_product_id IN produs.id%TYPE);
  
  FUNCTION get_hate_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR;
  FUNCTION get_love_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR;
  
  FUNCTION get_hate_stats_with_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR;
  FUNCTION get_love_stats_with_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR;
  
  FUNCTION get_hate_stats_without_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR;
  FUNCTION get_love_stats_without_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR;
  
END edec_produse_package;
/

CREATE OR REPLACE PACKAGE BODY edec_produse_package IS

PROCEDURE insertCarProd(v_id IN CARACTERISTICI_PRODUSE.id%TYPE,
                          v_prod_id IN CARACTERISTICI_PRODUSE.produs_id%TYPE,
                          v_car_id IN CARACTERISTICI_PRODUSE.caracteristica_id%TYPE) IS
  BEGIN
     INSERT INTO CARACTERISTICI_PRODUSE(ID,PRODUS_ID,CARACTERISTICA_ID) VALUES (v_id,v_prod_id,v_car_id);
  END insertCarProd;

PROCEDURE insertCarProd(v_prod_id IN CARACTERISTICI_PRODUSE.produs_id%TYPE,
                          v_car_id IN CARACTERISTICI_PRODUSE.caracteristica_id%TYPE) IS
  BEGIN
     INSERT INTO CARACTERISTICI_PRODUSE(PRODUS_ID,CARACTERISTICA_ID) VALUES (v_prod_id,v_car_id);
  END insertCarProd;

PROCEDURE insertCaracteristic (prod_id IN produs.id%TYPE,type_c caracteristica.categorie_caracteristici_id%TYPE) IS 
  carac_id caracteristica.id%TYPE;    
BEGIN

 SELECT id INTO carac_id
    FROM ( SELECT id FROM caracteristica
          WHERE categorie_caracteristici_id=type_c
          ORDER BY dbms_random.value )
    WHERE rownum = 1 ;
    
  INSERT INTO CARACTERISTICI_PRODUSE(produs_id,caracteristica_id) VALUES (prod_id,carac_id);
    
END insertCaracteristic;

PROCEDURE generateCaracteristics(max_car IN NUMBER) IS
  CURSOR prod_cursor IS
    SELECT id
    FROM produs;
    
  product_rec prod_cursor%ROWTYPE;
  v_no_car NUMBER(1);
  v_r_type CARACTERISTICA.CATEGORIE_CARACTERISTICI_ID%TYPE;
  
BEGIN
  FOR product_rec in prod_cursor LOOP
  
    v_no_car:=TRUNC(dbms_random.value(1,max_car));
    
    FOR i IN 0..v_no_car LOOP
      v_r_type:=TRUNC(dbms_random.value(1,4));
      insertCaracteristic(product_rec.id,v_r_type);
    END LOOP;
    
  END LOOP;
END generateCaracteristics;

PROCEDURE insertProduct(v_name IN produs.name%TYPE,v_image_id IN produs.image%TYPE )IS
BEGIN

  INSERT INTO produs(name,image) VALUES (v_name,v_image_id);
  
END insertProduct;

PROCEDURE insertProduct(v_id IN produs.id%TYPE,v_name IN produs.name%TYPE,v_image_id IN produs.image%TYPE )IS
BEGIN

  INSERT INTO produs(id,name,image) VALUES (v_id,v_name,v_image_id);
  
END insertProduct;

PROCEDURE edit_produs_name
      (new_name IN produs.name%TYPE,v_product_id IN produs.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM produs 
      WHERE v_product_id=produs.id  
      FOR UPDATE OF produs.name;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      produs SET produs.name=new_name 
      WHERE CURRENT OF update_cursor;
    END LOOP;
END edit_produs_name;

PROCEDURE edit_product_image
      (new_image IN produs.image%TYPE,v_product_id IN produs.id%TYPE)IS
      CURSOR update_cursor IS
      SELECT * FROM produs 
      WHERE v_product_id=produs.id  
      FOR UPDATE OF produs.image;
   BEGIN
    FOR indx IN update_cursor
    LOOP
      UPDATE
      produs SET produs.image=new_image 
      WHERE CURRENT OF update_cursor;
    END LOOP;
END edit_product_image;

PROCEDURE edit_product
      (new_name IN produs.name%TYPE,new_image IN produs.image%TYPE,v_product_id IN produs.id%TYPE)IS
  BEGIN
    edit_produs_name(new_name,v_product_id);
    edit_product_image(new_image,v_product_id);
END edit_product;

PROCEDURE edit_caract_name_prod
      (new_name IN caracteristica.name%TYPE,v_caracteristica_id IN caracteristica.id%TYPE,v_product_id IN produs.id%TYPE)IS
     
   BEGIN
      edec_caracteristici_package.edit_caracteristica_name(new_name,v_caracteristica_id);
END edit_caract_name_prod;

PROCEDURE edit_caract_categ_prod
      (new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.id%TYPE,v_product_id IN produs.id%TYPE)IS
     
   BEGIN
      edec_caracteristici_package.edit_caracteristica_category(new_category,v_caracteristica_id);
END edit_caract_categ_prod;

PROCEDURE edit_caract_prod
      (new_name IN caracteristica.name%TYPE,new_category IN CATEGORIE_CARACTERISTICI.NUME%TYPE,v_caracteristica_id IN caracteristica.id%TYPE,v_product_id IN produs.id%TYPE)IS
     
   BEGIN
      edec_caracteristici_package.edit_caracteristica(new_name,new_category,v_caracteristica_id);
END edit_caract_prod;

PROCEDURE importFromCSV(input_file_name IN VARCHAR2) IS
  
    input_file UTL_FILE.FILE_TYPE;
    V_LINE VARCHAR2(1000);
    v_id produs.id%TYPE;
    v_name produs.name%TYPE;   
    v_image produs.image%TYPE;
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
          v_name := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          v_image := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 3);
          
           insertProduct(TO_NUMBER(v_id),v_name,TO_NUMBER(v_image));
           it:=it+1;
        
        EXCEPTION
      WHEN DUP_VAL_ON_INDEX THEN
        raise_application_error(-20031,'Product already exists');
        it:=it+1;
      WHEN VALUE_ERROR THEN --when the file formar is wrong
        raise_application_error(-20032,'CSV file value error \\EDeC\sql\csv\'|| input_file_name ||'at  line '||it);
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
    edec_utils_package.exportToCSV('produs','produs.csv');
  END exportToCSV;

FUNCTION get_hate_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR IS
    hate_cursor SYS_REFCURSOR;
  BEGIN
    OPEN hate_cursor FOR SELECT * FROM view_Stats_Hate_Products WHERE ROWNUM <=car_no;
    RETURN hate_cursor;
  END get_hate_stats;
  
FUNCTION get_love_stats(car_no IN NUMBER) RETURN SYS_REFCURSOR IS
    love_cursor SYS_REFCURSOR;
  BEGIN
    OPEN love_cursor FOR SELECT * FROM view_Stats_Love_Products WHERE ROWNUM <=car_no;
    RETURN love_cursor;
  END get_love_stats;

FUNCTION get_hate_stats_with_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR IS
    hate_cursor SYS_REFCURSOR;--the result which will be returned
  
    v_carac_id caracteristica.id%TYPE:=-1;
  BEGIN
    SELECT caracteristica.id INTO v_carac_id
    FROM caracteristica WHERE name like without_carac_name;
     OPEN hate_cursor FOR
                      SELECT prod.name , count(*) AS Nr
                      FROM 
                      produs prod 
                      JOIN caracteristici_produse car_prod ON prod.id=car_prod.produs_id
                      JOIN user_hates uh ON car_prod.caracteristica_id=uh.caracteristica_id
                      WHERE prod.id in (SELECT produs.id FROM produs JOIN caracteristici_produse car_prod ON produs.id=car_prod.PRODUS_ID WHERE car_prod.CARACTERISTICA_ID=v_carac_id ) AND ROWNUM <=car_no
                      GROUP BY name
                      ORDER BY Nr DESC; 
    
    RETURN hate_cursor;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
    raise_application_error(-20033,'INVALID FEATURE NAME GIVEN');
    
  END get_hate_stats_with_car;

FUNCTION get_love_stats_with_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR IS
    love_cursor SYS_REFCURSOR;--the result which will be returned
  
    v_carac_id caracteristica.id%TYPE:=-1;
  BEGIN
    SELECT caracteristica.id INTO v_carac_id
    FROM caracteristica WHERE name like without_carac_name;
     OPEN love_cursor FOR
                      SELECT prod.name , count(*) AS Nr
                      FROM 
                      produs prod 
                      JOIN caracteristici_produse car_prod ON prod.id=car_prod.produs_id
                      JOIN user_loves ul ON car_prod.caracteristica_id=ul.caracteristica_id
                      WHERE prod.id in (SELECT produs.id FROM produs JOIN caracteristici_produse car_prod ON produs.id=car_prod.PRODUS_ID WHERE car_prod.CARACTERISTICA_ID=v_carac_id ) AND ROWNUM <=car_no
                      GROUP BY name
                      ORDER BY Nr DESC; 
    
    RETURN love_cursor;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
    raise_application_error(-20033,'INVALID FEATURE NAME GIVEN');
    
  END get_love_stats_with_car;
  
  FUNCTION get_hate_stats_without_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR IS
    hate_cursor SYS_REFCURSOR;--the result which will be returned
  
    v_carac_id caracteristica.id%TYPE:=-1;
  BEGIN
    SELECT caracteristica.id INTO v_carac_id
    FROM caracteristica WHERE name like without_carac_name;
     OPEN hate_cursor FOR
                      SELECT prod.name , count(*) AS Nr
                      FROM 
                      produs prod 
                      JOIN caracteristici_produse car_prod ON prod.id=car_prod.produs_id
                      JOIN user_hates uh ON car_prod.caracteristica_id=uh.caracteristica_id
                      WHERE prod.id not in (SELECT produs.id FROM produs JOIN caracteristici_produse car_prod ON produs.id=car_prod.PRODUS_ID WHERE car_prod.CARACTERISTICA_ID=v_carac_id ) AND ROWNUM <=car_no
                      GROUP BY name
                      ORDER BY Nr DESC; 
    
    RETURN hate_cursor;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
    raise_application_error(-20033,'INVALID FEATURE NAME GIVEN');
    
  END get_hate_stats_without_car;

FUNCTION get_love_stats_without_car(car_no IN NUMBER,without_carac_name IN caracteristica.name%TYPE) RETURN SYS_REFCURSOR IS
    love_cursor SYS_REFCURSOR;--the result which will be returned
  
    v_carac_id caracteristica.id%TYPE:=-1;
  BEGIN
    SELECT caracteristica.id INTO v_carac_id
    FROM caracteristica WHERE name like without_carac_name;
     OPEN love_cursor FOR
                      SELECT prod.name , count(*) AS Nr
                      FROM 
                      produs prod 
                      JOIN caracteristici_produse car_prod ON prod.id=car_prod.produs_id
                      JOIN user_loves ul ON car_prod.caracteristica_id=ul.caracteristica_id
                      WHERE prod.id not in (SELECT produs.id FROM produs JOIN caracteristici_produse car_prod ON produs.id=car_prod.PRODUS_ID WHERE car_prod.CARACTERISTICA_ID=v_carac_id ) AND ROWNUM <=car_no
                      GROUP BY name
                      ORDER BY Nr DESC; 
    
    RETURN love_cursor;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
    raise_application_error(-20033,'INVALID FEATURE NAME GIVEN');
    
  END get_love_stats_without_car;
END EDEC_PRODUSE_PACKAGE;
/





