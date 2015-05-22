###General Info

This folder is used to store all the script files which contains the packages.

###Contents

 

 - **1.edec_utils_package.sql**-script with the *edec_utils_package* package used to assists the tables from the database, it has the following procedures/functions: 
	 - exportToCSV(v_table_name,v_filename) procedure with 2 arguments that exports a table to a csv file:
		 - v_table_name = the name of the table that will pe exported;
		 - v_filename = the name of the file in which will the data be exported.
	 -  exportALLtoCSV procedure that exports all the tables from the database to csv files;
	 -  importALLfromCSV  procedure that imports all the tables from the csv files to the database;
	 -  exportall_no_carac procedure that imports all the tables from the csv files to the database except the *caracteristica.csv* file.

  

 - **2.edec_media_package.sql**-script with the *edec_media_package* package used to manipulate data from the *MEDIA* table, it contains the following procedures/functions:
	 -  importFromCSV(input_file_name) - used to import the data from the file given as input;
     -  insertMedia (v_url ,v_json )-used to insert row in the *MEDIA* table;
     -  exportToCSV - export the table *MEDIA*;
     -  edit_url(new_url,v_media_id) - edits the url column for a row specified by the v_media_id;
     - edit_file_json(new_json ,v_media_id )- edits the json_file column for a row specified by the v_media_id;
     - edit_media(new_url ,new_json ,v_media_id)- edits the two columns of the row specified by the v_media_id;
 - **3.edec_caracteristici_package.sql**-script with the *edec_caracteristici_package* package used to manipulate data from the *CARACTERISTICA* and *CATEGORIE_CARACTERISTICI* tables, it contains the following procedures/functions:
 
	 - importFromCSV(input_file_name ) - imports the data from the csv file given as parameter ;
     - insertCaracteristica(c_name ,c_cat) - insert a new feature with the given values from the parameters ;
     - exportToCSV - exports the *CARACTERISTICA* table to a csv file;
     - edit_caracteristica_name(new_name ,v_caracteristica_id ) - edit the name of the feature identified by the v_caracteristica_id;
	 - edit_caracteristica_category(new_category ,v_caracteristica_id)- edit the category of the feature identified by the v_caracteristica_id;
	 - edit_caracteristica (new_name ,new_category ,v_caracteristica_id )- edit the name and category of the feature identified by the v_caracteristica_id;
	 - edit_categorie_name(new_name ,v_categorie_id ) edit the category name of the feature identified by the v_caracteristica_id;
 - **4.edec_produse_package.sql**-script with the *edec_produse_package* package used to manipulate data from the *PRODUS* and *CARACTERISTICI_PRODUSE* tables, it contains the following procedures/functions: 
 -  importFromCSV(input_file_name) - imports the data from the specified file into the *PRODUS* table;
 - exportToCSV - exports the data from the table *PRODUS* to the csv file;
 - generateCaracteristics(max_car ) - generates a number of random features for all the products from the  *PRODUS* table and inserts the combinations into the *CARACTERISTICI_PRODUSE* table;
 - insertProduct(v_name,v_image_id )-inserts a product with the specified values for the columns into the *PRODUS* table;
 - insertCarProd(v_prod_id ,v_car_id ) - inserts a feature with the product which contains it to the *CARACTERISTICI_PRODUSE* table;                        
 - edit_produs_name(new_name ,v_product_id )-edits the name for a product specified with the id;
 - edit_product_image(new_image ,v_product_id )-edits the image for a product specified with the id;
 - edit_product(new_name ,new_image ,v_product_id )-edits the name and the image for a product specified with the id;
 - edit_caract_name_prod(new_name,v_caracteristica_id,v_product_id)-edits the name for the feature specified with v_caracteristica_id, feature contained by the product specified with the v_product_id;
 - edit_caract_categ_prod(new_category,v_caracteristica_id,v_product_id)-edits the name of the category for the feature specified with v_caracteristica_id, feature contained by the product specified with the v_product_id;
 - edit_caract_prod(new_name,new_category,v_caracteristica_id,v_product_id)-edits the name and the category name for the feature specified with v_caracteristica_id, feature contained by the product specified with the v_product_id;
 - **5.edec_users_package.sql** -script with the *edec_produse_package* package used to manipulate data from the *USERS* , *USER_HATES* and *USER_LOVES* tables, it contains the following procedures/functions: 
  
  -  importFromCSV(input_file_name )-import data from a csv file specified as a argument to the *USERS* table;
  - exportToCSV-exports the data from the *USERS* table to the csv file;
  - insertUser (v_username,v_pass,v_email,v_avatar,v_tip,v_data_nasterii,v_sex)-inserts a new user in the *USERS*table ;
  - populateHate(v_no_car)-populates the *USER_LOVES* table ;
  - populateLove(v_no_car)-populates the *USER_HATES* table ;
  - userExistsEmail(v_email)-verify if the user with the email specified as argument exists;
  - userExistsName(v_name)-verify if the user with the name specified as argument exists;
  - insertLove(user_id,carac_id)-insert a row in the *USER_LOVES* table;
  - insertHate(user_id,carac_id)--insert a row in the *USER_HATES* table;
  - edit_user_username(new_username,v_user_id)-edits the name for username specified by the v_user_id;
  - edit_user_pass(new_pass,v_user_id)-edits the password for username specified by the v_user_id;
  - edit_user_email(new_email,v_user_id)-edits the email for username specified by the v_user_id;
  - edit_user_avatar(new_avatar,v_user_id)-edits the avatar for username specified by the v_user_id;
  - edit_user_birthdate(new_birthdate,v_user_id)-edits the birth date for username specified by the v_user_id;
  - edit_user_type(new_type,v_user_id)-edits the type for username specified by the v_user_id;
  - edit_user_sex(new_sex,v_user_id)-edits the sex for username specified by the v_user_id;
  - edit_user(v_user_id,new_username,new_pass,new_email,new_avatar,new_type,new_birthdate,new_sex)-edits all the columns for a user specified by the id (should be used by the admin);
  - edit_user(v_user_id,new_pass,new_email,new_avatar,new_birthdate,new_sex)-edits the password,email,avatar,birth date and sex for username specified by the v_user_id;
  - show_hate(v_id )-shows the features that a user specified by it's id hates;
  - show_love(v_id )-shows the features that a user specified by it's id likes;

	
