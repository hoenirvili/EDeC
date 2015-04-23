

CREATE OR REPLACE PACKAGE edec_produse_package IS

PROCEDURE populateProduse ;
PROCEDURE generateCaracteristics(max_car IN NUMBER);
END edec_produse_package;
/

CREATE OR REPLACE PACKAGE BODY edec_produse_package IS

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

PROCEDURE insertProduct(prod_name IN produs.name%TYPE,image_id IN produs.image%TYPE )IS
BEGIN
  INSERT INTO produs(name,image) VALUES (prod_name,image_id);
END insertProduct;

PROCEDURE populateProduse IS

    input_file UTL_FILE.FILE_TYPE;
     V_LINE VARCHAR2(1000);
     v_name produs.name%TYPE;
     v_image produs.image%TYPE;
    

BEGIN
   input_file := UTL_FILE.FOPEN ('USER_DIR','produs_csv.txt', 'R');
   IF UTL_FILE.IS_OPEN(input_file) THEN
      LOOP
        BEGIN
          UTL_FILE.GET_LINE(input_file, V_LINE, 1000);
          IF V_LINE IS NULL THEN
            EXIT;
          END IF;
          v_name := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 1);
          v_image := REGEXP_SUBSTR(V_LINE, '[^,]+', 1, 2);
          
           insertProduct(v_name,TO_NUMBER(v_image));
          
          COMMIT;
        EXCEPTION
       WHEN NO_DATA_FOUND THEN
          EXIT;
       END;
     END LOOP;
    END IF;
    UTL_FILE.FCLOSE(input_file);
  
END populateProduse;


END edec_produse_package;
/





