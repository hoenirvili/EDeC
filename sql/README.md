#Instructions:

#### **CSV** file update

- You should run this directly in **SQL Plus** or **SQL Developer**, running it trough an ide, or another java application may cause troubles. 
- Make sure that in the **edec_caracteristici_package.sql** file you have set the proper path to the csv file. 
- It will take 5-10 minutes when importing the *caracteristica.csv* file.

###**First time running the database:**

####Run the following script:

 - \\EDeC\sql\shortcuts\ **install.sql**;
###**Just importing data into the database:**

 - \\EDeC\sql\shortcuts\ **run_import.sql** (without *caracteristica* table)
 - \\EDeC\sql\import\ **edec_import_all.sql** (with *caracteristica* table)

###**Just exporting the database:**
  - \\EDeC\sql\export\ **edec_export_all.sql**

###**Just rerunning the packages:**
 - \\EDeC\sql\shortcuts\ **run_packages.sql**

###**Just rerunning the functionality:**
 - \\EDeC\sql\shortcuts\ **run_functionality.sql*

####NOTE:

- If packages dosen't work please check if user has privileges and if you don't have privilages run when beeing SYS user
` GRANT EXECUTE ON UTL_FILE TO <user_name>;` 

- If you have error on date please enter this command in your sqlplus or sqldeveloper and run it
` alter SESSION set NLS_DATE_FORMAT = 'DD-MM-YYYY' `

###Details about the files:



#### Important

Current exception threshold -20040
Please decrement this number by one when you want to add an exception -> -20041 and update the readme.md file. If unsure ask Ionut. 

#####Exception codes

 - WRONG_EMAIL_FORMAT -20001 
 - WRONG_USERNAME_FORMAT -20002
 - WRONG_PASSWORD_FORMAT -20003 
 -   USER_EXISTS_EMAIL -20004
 -	DUP_VAL_ON_INDEX -20006	 
 -	VALUE_ERROR -20007
 -   show love -20008 
 - show hate -20009