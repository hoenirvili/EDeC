###General Info

This folder is used to store all scripts related to the install part which creates the database and adds the data to the tables created.

###Contents

 1. **edec_schema.sql**-the sql script which creates the tables and the constraints that are needed in the tables;
 2. **edec_triggers_sequences.sql**- sql script which creates the trigger for the tables and the sequences used for the auto incrementing of the id for every table;
 3. **edec_views.sql**-sql script used to create the views used to safely represent the data from the tables;

###Mention
For the correct initialisation of the database please keep the order of the files when running them individually (not using the shortcut scripts).