###General Info

This folder contains the **PL/SQL** script used to import the database to csv files.

###Contents

 - **edec_import_all.sql**-PL/SQL script which contains the declaration of the location of the csv files and a procedure that imports all the tables from the database to csv files.

###Mention
Make sure that the format of the csv files is kept after you insert lines in the files since the procedure invoked in the script might raise exceptions;