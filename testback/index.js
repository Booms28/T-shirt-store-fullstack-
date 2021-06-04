const express = require("express");
const app = express();

const port = 3000;

const admin = (req,res)=>{
    return res.send("This is the admin dashboard !");
};

const isAdmin = (req,res,next) =>{
    console.log("isAdmin is runninnng!");
    next();
};


app.get("/",(req,res)=>{
    return res.send("You are visiting Homepage");
});



app.get("/admin",isAdmin,admin);





app.get("/login",(req,res)=>{
    return res.send("You are visiting the login route");
});
app.get("/signup",(req,res)=>{

    return res.send("You are in the Signup route")
})

app.get("/signout",(req,res)=>{
    res.send('you are visiting signout');
})

app.listen(port,() =>{
    console.log("Server is Up and running");
});