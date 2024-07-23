var express = require("express");
var mysql2 = require("mysql2");
var fileuploader = require("express-fileupload");
const nodemailer = require('nodemailer');


let app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileuploader());


app.listen(2040, function () {
    console.log("Server Started ::-)");
})


// let config = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "yaten@123",
//     database: "projects",
//     dateStrings: true
// }
let config = {
    host: "bes0w5q2krdvjtdggn1v-mysql.services.clever-cloud.com",
    user: "uuwqlfl6xtwltqxd",
    
    password: "NWzUl6WfX1p3yApeMnci",
    database: "bes0w5q2krdvjtdggn1v",
    dateStrings: true,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
   
}
let mailTransporter =
nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: "arorayatin005@gmail.com",
            pass: "bllk yfsy qadk nrul"
        }
    }
);

// --------------------
app.post("/forgot-password",function(req,resp){

    
    let reciver=req.body.sendto;
    
    let txtt=req.body.txt;
    console.log(req.body.txtEmaill);
    
    mysql.query("select pass from info where email=?",[req.body.txtEmaill],function(err,result)
    {
            if(err==null)
            {
                let  mailDetails = {
    
    
                    from: 'arorayatin005@gmail.com',
                    to: req.body.txtEmaill,
                
                    subject:'Your Password',
                    text:result[0].pass     
                };
                mailTransporter
                .sendMail( mailDetails,
                    function (err, data) {
                        if (err) {
                            resp.send('Error Occurs');
                            console.log(err.message);
                        } else {
                            resp.send('Email sent successfully');
                        }
                    });
                }
                else
                    resp.send(err.message);
            
    })
        
    
    })
    
    //---------------------------------------- 

var mysql = mysql2.createConnection(config);
mysql.connect(function (err) {
    if (err == null)
        console.log("Connected To Database Successfulllyyyy");
    else
        console.log(err.message + "  ########");
})



app.get("/", function (req, resp) {
    var path = __dirname + "/public/index.html";
    resp.sendFile(path);
})

app.post("/signup-process", function (req, resp) {
    var status = 1;
    mysql.query("insert into info values(?,?,?,?,?)", [req.body.txtEmail, req.body.txtPwd, req.body.txtConPwd, req.body.accs, status], function (err) {
        // if(err==null)
        //         resp.send("Signed Up Successfuly");
        //     else
        //         resp.send(err.message);
        if (err) {
            resp.send(err.message);
        }
        else {
            resp.send("SignUp successful");
            console.log("successful");

        }
    })
})

app.post("/login-process", function (req, resp) {

    email = req.body.txtEmaill;
    pwd = req.body.txtPwdd;

    mysql.query("Select * from info where email=? and pass=?", [email, pwd], function (err, resultt) {
        if (err == null)
            resp.send(resultt);
        else
            console.log(err.message);

    })
})

app.get("/Inf-Dash", function (req, resp) {
    var path = __dirname + "/public/Inf-Dash.html";
    resp.sendFile(path);
})


app.get("/Inf-Profile", function (req, resp) {
    var path = __dirname + "/public/Inf-Profile.html";
    resp.sendFile(path);
})

app.post("/save-process", function (req, resp) {

    let fields = req.body.field;


    let str;                     // This is the another method of printing th combo box by using substring menthod 
    if (Array.isArray(fields)) {
        str = "";
        for (i = 0; i < fields.length; i++) {
            str += fields[i] + ",";
        }
        console.log(str);
    }
    else
        str = fields;

    number = req.body.txtPhone;

    let fileName = "";
    if (req.files != null) {

        fileName = req.files.ppic.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.ppic.mv(path);
    }
    else {
        fileName = req.body.hdn;
    }


    mysql.query("insert into IProfile values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.txtEmail, fileName, req.body.txtName, req.body.txtLastName, req.body.txtGender, req.body.dob, req.body.txtPhone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.insta, req.body.youtube, req.body.facebook, req.body.twitter, str, req.body.comments], function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            resp.redirect("result.html");
            console.log("successful");

        }
    })
})


app.post("/update-process", function (req, resp) {
    let fields = req.body.field;


    let str;                     // This is the another method of printing th combo box by using substring menthod 
    if (Array.isArray(fields)) {
        str = "";
        for (i = 0; i < fields.length; i++) {
            str += fields[i] + ",";
        }
        console.log(str);
    }
    else
        str = fields;




    console.log(req.body);
    let fileName = "";
    if (req.files != null) {

        fileName = req.files.ppic.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.ppic.mv(path);
    }
    else {
        fileName = req.body.hdn;
    }
    //req.body.ppic=fileName;
    //resp.send(req.body);

    //plz use Table wale columns ke NAAAMMMM
    mysql.query("update IProfile set picpath=?, name=?,lastname =?,gender =?,dob  =?,contact  =?,address=? ,city =?,state =?,zip=?,insta=?,fb=?,youtube=?,twitter=?,field =?,txt =? where email=?", [fileName, req.body.txtName, req.body.txtLastName, req.body.txtGender, req.body.dob, req.body.txtPhone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.insta, req.body.youtube, req.body.facebook, req.body.twitter, str, req.body.comments, req.body.txtEmail], function (err, result) {
        if (err == null)//no error
        {
            if (result.affectedRows >= 1)
                resp.redirect("result.html");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})


//--------------------------------------------------
app.get("/find-user-details",function(req,resp){
         

    let email= req.query.txtEmail;
    mysql.query("select * from IProfile  where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       console.log(resultJsonAry);
       resp.send(resultJsonAry)
    })

});


//-----------------------------------

app.post("/postevents-process", function (req, resp) {


    mysql.query("insert into events values(?,?,?,?,?,?,?)", [null,req.body.txtEmail, req.body.txtTittle, req.body.txtDate, req.body.txtTime, req.body.txtCity, req.body.txtVenue], function (err) {
        // if(err==null)
        //         resp.send("Signed Up Successfuly");
        //     else
        //         resp.send(err.message);
        if (err) {
            resp.send(err.message);
        }
        else {
            resp.send("Event Posted Successfully");
            console.log("successful");

        }
    })
})

app.post("/update-pass",function(req,resp){
     console.log(req.body.txtEmail2);
    mysql.query("select pass from  info where email=? ",[req.body.txtEmail2],function(err,result){
        if(err)
        {
            resp.send(err.message);
        }
        else{
       
         console.log(result);
          if(result[0].pass==req.body.txtPwd)
          {
            if(req.body.txtPwd2==req.body.txtConPwd)
            {
                mysql.query("update info set pass=? where email=?",[req.body.txtPwd2,req.body.txtEmail2],function(err){
                    if (err == null)//no error
                    {
                       resp.send("Password Changed")
                    }
                    else
                        resp.send(err.message);
                })
            }
            else
            resp.send("Please Check Your Confirm Password")
          }
          else
          resp.send("please Check the details again")
        }
       
        })

        
    })

    // ------------------------------------------------
    app.get("/Admin-Dash", function (req, resp) {
        var path = __dirname + "/public/Admin-Dash.html";
        resp.sendFile(path);
    })

    app.get("/admin-all-influ", function (req, resp) {
        var path = __dirname + "/public/admin-all-influ.html";
        resp.sendFile(path);
    })

    app.get("/admin-users", function (req, resp) {
        var path = __dirname + "/public/admin-users.html";
        resp.sendFile(path);
    })

    app.get("/fetch-all",function(req,resp){
    
        mysql.query("select * from IProfile ",function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           console.log(resultJsonAry);
           resp.send(resultJsonAry)
        })
    })

    app.get("/fetch-login-all",function(req,resp){
    
        mysql.query("select * from info ",function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           console.log(resultJsonAry);
           resp.send(resultJsonAry)
        })
    })


    app.get("/del-one",function(req,resp){

        mysql.query("delete from info where email=?",[req.query.email],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
                resp.send("Deleted");
            })
    
    })


    app.get("/block-one",function(req,resp){

        mysql.query("update info set status=0 where email=?",[req.query.email],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
                resp.send("Blocked!");
            })
    
    })
    
    

    app.get("/unblock-one",function(req,resp){

        mysql.query("update info set status=1 where email=?",[req.query.email],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
                resp.send("Unblocked!");
            })
    
    })
    //----------------------------
    app.get("/Influencer-Finder", function (req, resp) {
        var path = __dirname + "/public/influ-finder.html";
        resp.sendFile(path);
    })

    app.get("/fill-city",function(req,resp){
    
        mysql.query("select distinct city from IProfile ",function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           console.log(resultJsonAry);
           resp.send(resultJsonAry)
        })
    })

    app.get("/fill-distinct-city",function(req,resp){
     
        fields=req.query.field;
        mysql.query("select distinct city from IProfile where field like ? ",["%"+fields.toString()+"%"],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           console.log(resultJsonAry);
           resp.send(resultJsonAry)
        })
    })

    app.get("/searchbyname",function(req,resp)
    {
        let name="%"+req.query.fname+"%";
        
        mysql.query("select * from IProfile where name like ?",[name],function(err,result){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           
            console.log(result);
            resp.send(result);
        })
    })

    app.get("/all-cards",function(req,resp){
    
        mysql.query("select * from IProfile ",function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           console.log(resultJsonAry);
           resp.send(resultJsonAry)
        })
    })
    
    app.get("/searchbyfields",function(req,resp)
    {
        let fieldss="%"+req.query.fields+"%";
        let citiess="%"+req.query.cities+"%";

        
        mysql.query("select * from IProfile where field like ? and city like ? ",[fieldss,citiess],function(err,result){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           
            console.log(result);
            resp.send(result);
        })
    })


    app.get("/fillalldata",function(req,resp){
        let email=req.query.email;
        
        mysql.query("select * from IProfile where email=? ",[email],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           console.log(resultJsonAry);
           resp.send(resultJsonAry)
        })
    })

    // ----------------------------------------------------------------------------

    app.get("/event-manager", function (req, resp) {
        var path = __dirname + "/public/events-manager.html";
        resp.sendFile(path);
    })
    
    
    app.get("/fetchallevent",function(req,resp){
        let email=req.query.email;
        
        mysql.query("select * from events where doe>=current_date() and emailid=? ",[email],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
           console.log(resultJsonAry);
           resp.send(resultJsonAry)
        })
    })



    
    app.get("/del-one-event",function(req,resp){

        mysql.query("delete from events where rid=?",[req.query.rid],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
                resp.send(resultJsonAry);
            })
    
    })

// ----------------------------------------------------------------------------------------------------------

app.get("/Client-Profile", function (req, resp) {
    var path = __dirname + "/public/client-profile.html";
    resp.sendFile(path);
})

app.get("/Inf-finder", function (req, resp) {
    var path = __dirname + "/public/influ-finder.html";
    resp.sendFile(path);
})



// -------------------------------------------------------
app.post("/save-data-process", function (req, resp) {



    mysql.query("insert into CProfile values(?,?,?,?,?,?,?,?,?)", [req.body.txtEmail,req.body.txtName, req.body.txtLastName, req.body.txtClient, req.body.txtPhone, req.body.address, req.body.city, req.body.state, req.body.zip,], function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            resp.redirect("result.html");
            console.log("successful");

        }
    })
})

app.post("/update-data-process", function (req, resp) {
   
    mysql.query("update CProfile set name=?,lastname =?,Ctype =?,contact  =?,address=? ,city =?,state =?,zip=? where email=?", [ req.body.txtName, req.body.txtLastName, req.body.txtClient, req.body.txtPhone, req.body.address, req.body.city, req.body.state, req.body.zip,req.body.txtEmail], function (err, result) {
        if (err == null)//no error
        {
            if (result.affectedRows >= 1)
                resp.redirect("result.html");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})

app.get("/find-client-details",function(req,resp){
         

    let email= req.query.txtEmail;
    mysql.query("select * from CProfile  where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       console.log(resultJsonAry);
       resp.send(resultJsonAry)
    })

});

// ------------------------------------------------------

app.get("/client-console", function (req, resp) {
    var path = __dirname + "/public/admin-all-client.html";
    resp.sendFile(path);
})


app.get("/fetch-all-client",function(req,resp){
    
    mysql.query("select * from CProfile ",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       console.log(resultJsonAry);
       resp.send(resultJsonAry)
    })
})

app.post("/update-client-pass",function(req,resp){

    console.log(req.body.txtEmail2);
   mysql.query("select pass from  info where email=? ",[req.body.txtEmail2],function(err,result){
       if(err)
       {
           resp.send(err.message);
       }
       else{
      
        console.log(result);
         if(result[0].pass==req.body.txtPwd)
         {
           if(req.body.txtPwd2==req.body.txtConPwd)
           {
               mysql.query("update info set pass=? where email=?",[req.body.txtPwd2,req.body.txtEmail2],function(err){
                   if (err == null)//no error
                   {
                      resp.send("Password Changed")
                   }
                   else
                       resp.send(err.message);
               })
           }
           else
           resp.send("Please Check Your Confirm Password")
         }
         else
         resp.send("please Check the details again")
       }
      
       })

       
   })


app.get("/disable-button",function(req,resp){
    
    
    mysql.query("select * from IProfile where email=? ",[req.query.txtEmail],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       console.log(resultJsonAry);
       resp.send(resultJsonAry);
    })
})

app.get("/disable-client-button",function(req,resp){
    
    
    mysql.query("select * from CProfile where email=? ",[req.query.txtEmail],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       console.log(resultJsonAry);
       resp.send(resultJsonAry);
    })
})

app.get("/contact-influ",function(req,resp){

    
    let reciver=req.query.email;
    
    let txtt="It is to infrom you that you would be liked to be contacted by a client for a sponsership deal. Kindly contact them on "+req.query.email2+" email."
    console.log(req.body.txtEmaill);
    
   
    
                let  mailDetails = {
    
    
                    from: 'arorayatin005@gmail.com',
                    to: reciver,
                
                    subject:'Contact',
                    text:txtt    
                };
                mailTransporter
                .sendMail( mailDetails,
                    function (err, data) {
                        if (err) {
                            resp.send('Error Occurs');
                            console.log(err.message);
                        } else {
                            resp.send('Email sent successfully');
                        }
                    });
                
         
            
    })
        
    
    