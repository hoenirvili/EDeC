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
  SELECT car.name , count(*) "Number"
  FROM caracteristica car JOIN user_loves ul
  ON car.id=ul.caracteristica_id
  GROUP BY name
  ORDER BY car.name ASC;

CREATE OR REPLACE VIEW view_Statistics_Hate AS
  SELECT car.name , count(*) "Number"
  FROM caracteristica car JOIN user_hates uh
  ON car.id=uh.caracteristica_id
  GROUP BY name
  ORDER BY car.name ASC;