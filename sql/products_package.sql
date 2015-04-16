

CREATE OR REPLACE PACKAGE edec_produse IS

PROCEDURE populate ;
PROCEDURE generate_caracteristics(max_car IN NUMBER);
END edec_produse;
/

CREATE OR REPLACE PACKAGE BODY edec_produse IS

PROCEDURE insert_caracteristic (prod_id IN produs.id%TYPE,type_c caracteristica.categorie_caracteristici_id%TYPE) IS 
  carac_id caracteristica.id%TYPE;    
BEGIN

 SELECT id INTO carac_id
    FROM ( SELECT id FROM caracteristica
          WHERE categorie_caracteristici_id=type_c
          ORDER BY dbms_random.value )
    WHERE rownum = 1 ;
    
  INSERT INTO CARACTERISTICI_PRODUSE(produs_id,caracteristica_id) VALUES (prod_id,carac_id);
    
END insert_caracteristic;

PROCEDURE generate_caracteristics(max_car IN NUMBER) IS
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
      insert_caracteristic(product_rec.id,v_r_type);
    END LOOP;
    
  END LOOP;
END generate_caracteristics;

PROCEDURE insert_product(prod_name IN produs.name%TYPE,image_id IN produs.image%TYPE )IS
BEGIN
  INSERT INTO produs(name,image) VALUES (prod_name,image_id);
END insert_product;

PROCEDURE populate IS
BEGIN
  insert_product('product1',28);
  insert_product('product2',29);
  insert_product('product3',30);
  insert_product('product4',31);
  insert_product('product5',32);
  insert_product('product6',33);
  insert_product('product7',34);
  insert_product('product8',35);
  insert_product('product9',36);
  insert_product('product10',37);
  insert_product('product11',38);
  insert_product('product12',39);
  insert_product('product13',40);
  insert_product('product14',41);
  insert_product('product15',42);
END populate;


END edec_produse;
/

BEGIN
  edec_produse.populate;
  edec_produse.generate_caracteristics(4);
END;



