# EDeC
        Ethic Decisions for Consummers
        
### Development instructions
        
        1. Git Pull !!! Always git pull first.
        2. Set local.php database values , url, Production false
        3. create .gitignore file inside src/application/config folder and add the following lines to it :
            local.php
        4. Make sure you use grunt for development, do not touch main.js , or main.css
        5. Always push and pull, always ask before doing anything you aren't sure. 
        6. Configure IDE to upload only src contents to the server.
        7. Upload the entire src content to server
        8. Access deployment url on your local server and start developing 
        
### Untrack files     
    
    > After setting the gitignore files, if you have already tracked the files you will need to do as follows :
    
    1. run git rm -r --cached .
    2. run git add .
    3. git commit -m ".gitignore is now working"
    4. git push
    
    
    
        
        