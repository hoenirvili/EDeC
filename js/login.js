$(document).ready(function(){
    
 $('#loginForm').on('init.field.fv',function(e,data){
     var $parent = data.element.parents('.form-group'),
         $icon = data.element.data('fv.icon'),
         $label = $parent.find('label');
       /* ERROR*/  
     $icon.insertAfter($label);
 }).formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            Username: {
                validators:{
                    notEmpty: {
                        message: 'The username is required'
                    }
                }//validators
            },//username
        
            Password: {
                validators:{
                    notEmpty:{
                        message: 'The Password is required'
                    }
                }//validators
            }//password
        }//fields
  
  });
});