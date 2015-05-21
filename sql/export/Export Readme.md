###General Info

This folder contains the **PL/SQL** script used to export the database to csv files.

###Contents

 - **edec_export_all.sql**-PL/SQL script which contains the declaration of the path to the location where the csv files will be created and a procedure that exports all the tables from the database to csv files.

###Mention
Make sure that when you are connected in the sql database you do not have other tables apart from the tables made by the install script because the export script runs on every table from the database.