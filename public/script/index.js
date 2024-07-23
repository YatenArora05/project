$(document).ready(function(){
    $("#submitbtn").click(function(){
        
      let obj={
        type:"post",
        url:"/signup-process",
        data:{
            txtEmail:$("#txtEmail").val(),
            txtPwd:$("#txtPwd").val(),
            txtConPwd:$("#txtConPwd").val(),
           
        }
       
      }
      $.ajax(obj).done(function(resp){
         $("#errmessage").html(resp);    

      }).fail(function(err){
        alert(err.statusText);   

      })
    })
})