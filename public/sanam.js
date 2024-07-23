var express=require("express");
var mysql2=require("mysql2");
var fileuploader=require("express-fileupload");

let app=express();

app.listen(2005,function()
{
    console.log("Project Server started");
})

app.use(fileuploader());
app.use(express.static("public"));
app.use(express.urlencoded("true"));

let config={
    host:"127.0.0.1",
    user:"root",
    password:"S@n@m2005",
    database:"project",
    dateStrings:true
}

var mysql=mysql2.createConnection(config);

mysql.connect(function(err){
    if(err)
        console.log(err.message);
    else 
        console.log("Connection successful");
})

app.get("/",function(req,resp){
    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})

app.post("/signup-process",function(req,resp)
{
    var email=req.body.txtEmail;
    var pwd=req.body.txtPwd;
    var account=req.body.accs;
    var status=1;

    mysql.query("insert into users values(?,?,?,?)",[email,pwd,account,status],function(err){
        if(err)
            {
                resp.send(err.message);
            }
            else 
            {
                resp.send("SignUp successful");
                console.log("successful");
            }
    })

})

app.post("/login-process",function(req,resp)
{
    var email=req.body.txtEmaill;
    var pwd=req.body.txtPwdd;

    mysql.query("Select * from users where email=? and pwd=?",[email,pwd],function(err,resultt)
{
    if(err!=null)
    {
        // resp.send(err.message);
        console.log(err.message);
        return;
    }
        resp.send(resultt);
        // console.log(resultt);
})
})