CREATE OR REPLACE VIEW view_Caracteristics_ordName AS
   SELECT name,categorie_caracteristici_id
   FROM caracteristica
   ORDER BY name ASC;

CREATE OR REPLACE VIEW view_Caracteristics_ordCat AS
   SELECT name,categorie_caracteristici_id
   FROM caracteristica
   ORDER BY categorie_caracteristici_id ASC;
   
CREATE OR REPLACE VIEW view_Organizatii AS
  SELECT car.name
  FROM caracteristica car JOIN categorie_caracteristici cat
  ON car.categorie_caracteristici_id=cat.id
  WHERE cat.nume='ORGANIZATII'
  ORDER BY car.name ASC;

CREATE OR REPLACE VIEW view_Orase AS
  SELECT car.name
  FROM caracteristica car JOIN categorie_caracteristici cat
  ON car.categorie_caracteristici_id=cat.id
  WHERE cat.nume='ORASE'
  ORDER BY car.name ASC;

CREATE OR REPLACE VIEW view_SubsAlim AS
  SELECT car.name
  FROM caracteristica car JOIN categorie_caracteristici cat
  ON car.categorie_caracteristici_id=cat.id
  WHERE cat.nume='SUBSTANTE ALIMENTARE'
  ORDER BY car.name ASC;
  
CREATE OR REPLACE VIEW view_Subs_Nealim AS
  SELECT car.name
  FROM caracteristica car JOIN categorie_caracteristici cat
  ON car.categorie_caracteristici_id=cat.id
  WHERE cat.nume='SUBSTANTE NEALIMENTARE'
  ORDER BY car.name ASC;

CREATE OR REPLACE VIEW view_Produse AS
  SELECT name
  FROM produs
  ORDER BY name ASC;
  
CREATE OR REPLACE VIEW view_Produse_Org AS
  SELECT p.name 
  FROM produs p 
  JOIN caracteristici_produse cp ON cp.produs_id=p.id 
  JOIN caracteristica c ON cp.caracteristica_id=c.id
  WHERE c.categorie_caracteristici_id=1
  ORDER BY p.name ASC;
  
CREATE OR REPLACE VIEW view_Produse_SubsAlim AS
  SELECT p.name 
  FROM produs p 
  JOIN caracteristici_produse cp ON cp.produs_id=p.id 
  JOIN caracteristica c ON cp.caracteristica_id=c.id
  WHERE c.categorie_caracteristici_id=2
  ORDER BY p.name ASC;
  
CREATE OR REPLACE VIEW view_Produse_SubsNealim AS
  SELECT p.name 
  FROM produs p 
  JOIN caracteristici_produse cp ON cp.produs_id=p.id 
  JOIN caracteristica c ON cp.caracteristica_id=c.id
  WHERE c.categorie_caracteristici_id=3
  ORDER BY p.name ASC;
  
CREATE OR REPLACE VIEW view_Produse_City AS
  SELECT p.name 
  FROM produs p 
  JOIN caracteristici_produse cp ON cp.produs_id=p.id 
  JOIN caracteristica c ON cp.caracteristica_id=c.id
  WHERE c.categorie_caracteristici_id=4
  ORDER BY p.name ASC;
   
CREATE OR REPLACE VIEW view_Statistics_Love AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_loves ul
  ON car.id=ul.caracteristica_id
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Statistics_Hate AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_hates uh
  ON car.id=uh.caracteristica_id
  GROUP BY name
  ORDER BY Nr DESC;
  
CREATE OR REPLACE VIEW view_Stats_Love_Cities AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_loves ul
  ON car.id=ul.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=4
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Hate_Cities AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_hates uh
  ON car.id=uh.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=4
  GROUP BY name
  ORDER BY Nr DESC;
  
CREATE OR REPLACE VIEW view_Stats_Love_SubsNealim AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_loves ul
  ON car.id=ul.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=3
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Hate_SubsNealim AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_hates uh
  ON car.id=uh.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=3
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Love_SubsAlim AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_loves ul
  ON car.id=ul.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=2
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Hate_SubsAlim AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_hates uh
  ON car.id=uh.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=2
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Love_Org AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_loves ul
  ON car.id=ul.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=1
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Hate_Org AS
  SELECT car.name , count(*) AS Nr
  FROM caracteristica car JOIN user_hates uh
  ON car.id=uh.caracteristica_id
  WHERE car.CATEGORIE_CARACTERISTICI_ID=1
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Hate_Products AS
  SELECT prod.name , count(*) AS Nr
  FROM 
  produs prod 
  JOIN caracteristici_produse car_prod ON prod.id=car_prod.produs_id
  JOIN user_hates uh ON car_prod.caracteristica_id=uh.caracteristica_id
  GROUP BY name
  ORDER BY Nr DESC;

CREATE OR REPLACE VIEW view_Stats_Love_Products AS
  SELECT prod.name , count(*) AS Nr
  FROM 
  produs prod 
  JOIN caracteristici_produse car_prod ON prod.id=car_prod.produs_id
  JOIN user_loves ul ON car_prod.caracteristica_id=ul.caracteristica_id
  GROUP BY name
  ORDER BY Nr DESC;
  
CREATE OR REPLACE VIEW view_stats_products AS
  SELECT cat_car.nume, count(*) AS Nr
  FROM 
  produs prod 
  JOIN caracteristici_produse car_prod ON prod.id=car_prod.produs_id
  JOIN caracteristica car ON car_prod.caracteristica_id=car.id
  JOIN CATEGORIE_CARACTERISTICI cat_car ON car.CATEGORIE_CARACTERISTICI_ID=cat_car.id
  GROUP BY cat_car.nume
  ORDER BY Nr DESC;
  
  select * from view_stats_products;