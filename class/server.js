const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path")



app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))


app.use(cookieParser("when use sign cookie write something here"));
app.use(session({secret:"my secret is here..",resave:false,saveUninitialized:true}));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next();

})


// app.get("/cook",(req,res)=>{
//     res.cookie("greet","abinandan")
//     res.send("You got  a  cookie")
// })


// app.get("/cook/new",(req,res)=>{

//     res.send("You havecooSie")
// })
 
// app.get("/greet",(req,res)=>{
//     let{name="dev"} = req.cookies;
//     console.log(req.cookies);
//     res.send(`hi${name}`)
    
//     // res.send("ok i am cookie")
// })

// signed cookies

// app.get("/checkcook",(req,res)=>{
//     res.cookie("name","raj",{signed:true})
//     res.send("verificatio complete")
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies)
//     res.send("verification complete") 
// })


// app.get("/test",(req,res)=>{
//   res.send("test successful")
// })


// app.get("/count",(req,res)=>{
//     if(  req.session.count){
//           req.session.count++
//     }else{
//               req.session.count =1

//     }
//     res.send(`You have Visted ${  req.session.count} time`)
// })


// session use ik page me seesion ke value ko store karva ke doosere page me use value ko use kar sake


app.get("/register",(req,res)=>{
    let{name = "anoymes"}  = req.query;
     req.session.name = name;
     if(name === "anoymes"){
   req.flash("error","user varification failed")

     }else{
   req.flash("success","user verification successfully")

     }
//    console.log( req.session)
//    req.flash("success","user verification successfully")
//    req.flash("error","user varification failed")

     res.redirect("/hello")
})

app.get("/hello",(req,res)=>{


    res.render("page.ejs",{name:req.session.name})

    // res.render("page.ejs",{name:req.session.name,messages:req.flash("success")})
})

 
         

 
 










app.listen(8080,()=>{
    console.log("Server is running ")
})