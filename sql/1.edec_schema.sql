  -- tables
-- Table: caracteristica
DROP TABLE caracteristica cascade constraints;
CREATE TABLE caracteristica (
    id integer  NOT NULL,
    name varchar2(300)  NOT NULL,
    categorie_caracteristici_id integer  NOT NULL,
    CONSTRAINT caracteristica_pk PRIMARY KEY (id)
) ;




-- Table: caracteristici_produse
DROP TABLE caracteristici_produse cascade constraints;
CREATE TABLE caracteristici_produse (
    id integer  NOT NULL,
    produs_id integer  NOT NULL,
    caracteristica_id integer  NOT NULL,
    misc varchar2(100)  NULL,
    CONSTRAINT caracteristici_produse_pk PRIMARY KEY (id)
) ;

DROP INDEX caracteristici_produse_idx_1;
CREATE UNIQUE INDEX caracteristici_produse_idx_1 
on caracteristici_produse 
(produs_id ASC,caracteristica_id ASC)
;




-- Table: categorie_caracteristici
DROP TABLE categorie_caracteristici cascade constraints;
CREATE TABLE categorie_caracteristici (
    id integer  NOT NULL,
    nume varchar2(100)  NOT NULL,
    CONSTRAINT categorie_caracteristici_pk PRIMARY KEY (id)
) ;




-- Table: media
DROP TABLE media cascade constraints;
CREATE TABLE media (
    id integer  NOT NULL,
    url varchar2(200)  NOT NULL,
    file_json varchar2(1000)  NOT NULL,
    CONSTRAINT media_pk PRIMARY KEY (id)
) ;




-- Table: produs
DROP TABLE produs cascade constraints;
CREATE TABLE produs (
    id integer  NOT NULL,
    name varchar2(300)  NOT NULL,
    image integer  NOT NULL,
    CONSTRAINT produs_pk PRIMARY KEY (id)
) ;




-- Table: user_hates
DROP TABLE user_hates cascade constraints;
CREATE TABLE user_hates (
    id integer  NOT NULL,
    user_id integer  NOT NULL,
    caracteristica_id integer  NOT NULL,
    CONSTRAINT user_hates_pk PRIMARY KEY (id)
) ;


DROP INDEX user_hates_idx_1;
CREATE INDEX user_hates_idx_1 
on user_hates 
(user_id ASC,caracteristica_id ASC)
;




-- Table: user_loves
DROP TABLE user_loves cascade constraints;
CREATE TABLE user_loves (
    Id integer  NOT NULL,
    user_id integer  NOT NULL,
    caracteristica_id integer  NOT NULL,
    CONSTRAINT user_loves_pk PRIMARY KEY (Id)
) ;

DROP INDEX user_loves_idx_1;
CREATE INDEX user_loves_idx_1 
on user_loves 
(user_id ASC,caracteristica_id ASC)
;




-- Table: users
DROP TABLE users cascade constraints;
CREATE TABLE users (
    id integer  NOT NULL,
    username varchar2(300)  NOT NULL,
    pass varchar2(500)  NOT NULL,
    email varchar2(200)  NOT NULL,
    avatar integer  NOT NULL,
    tip integer  NOT NULL, 
    data_nasterii date  NOT NULL,
    sex varchar2(1)  NOT NULL,
    CONSTRAINT check_1 CHECK (sex IN ('M','F')),
    CONSTRAINT users_pk PRIMARY KEY (id),
    CONSTRAINT unique_email UNIQUE (email)
) ;




-- foreign keys
-- Reference:  caract_categorie_caract (table: caracteristica)

--ALTER TABLE caracteristica DROP CONSTRAINT caract_categorie_caract; 
ALTER TABLE caracteristica ADD CONSTRAINT caract_categorie_caract 
    FOREIGN KEY (categorie_caracteristici_id)
    REFERENCES categorie_caracteristici (id)
    ;

-- Reference:  caract_produse_caract (table: caracteristici_produse)

--ALTER TABLE caracteristici_produse DROP CONSTRAINT caract_produse_caract; 
ALTER TABLE caracteristici_produse ADD CONSTRAINT caract_produse_caract 
    FOREIGN KEY (caracteristica_id)
    REFERENCES caracteristica (id)
    ;

-- Reference:  caract_produse_produs (table: caracteristici_produse)

--ALTER TABLE caracteristici_produse DROP CONSTRAINT caract_produse_produs; 
ALTER TABLE caracteristici_produse ADD CONSTRAINT caract_produse_produs 
    FOREIGN KEY (produs_id)
    REFERENCES produs (id)
    ;

-- Reference:  produse_media (table: produs)

--ALTER TABLE produs DROP CONSTRAINT produse_media;
ALTER TABLE produs ADD CONSTRAINT produse_media 
    FOREIGN KEY (image)
    REFERENCES media (id)
    ;

-- Reference:  user_hates_caracteristica (table: user_hates)

--ALTER TABLE user_hates DROP CONSTRAINT user_hates_caracteristica;
ALTER TABLE user_hates ADD CONSTRAINT user_hates_caracteristica 
    FOREIGN KEY (caracteristica_id)
    REFERENCES caracteristica (id)
    ;

-- Reference:  user_hates_user (table: user_hates)

--ALTER TABLE user_hates DROP CONSTRAINT user_hates_user;
ALTER TABLE user_hates ADD CONSTRAINT user_hates_user 
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ;

-- Reference:  user_loves_caracteristica (table: user_loves)

--ALTER TABLE user_loves DROP CONSTRAINT user_loves_caracteristica;
ALTER TABLE user_loves ADD CONSTRAINT user_loves_caracteristica 
    FOREIGN KEY (caracteristica_id)
    REFERENCES caracteristica (id)
    ;

-- Reference:  user_loves_user (table: user_loves)

--ALTER TABLE user_loves DROP CONSTRAINT user_loves_user;
ALTER TABLE user_loves ADD CONSTRAINT user_loves_user 
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ;

-- Reference:  user_media (table: users)

--ALTER TABLE users DROP CONSTRAINT user_media;
ALTER TABLE users ADD CONSTRAINT user_media 
    FOREIGN KEY (avatar)
    REFERENCES media (id)
    ;

