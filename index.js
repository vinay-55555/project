if(process.env.NODE_ENV != "production"){
require('dotenv').config()

}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js")
// const path = require("path")
const {listingSchema,reviewSchema} = require("./schemavalidation.js");
const { valid } = require("joi");
const Review = require("./models/review.js")
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const session = require("express-session");

const MongoStore = require('connect-mongo').default || require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { resourceLimits } = require("worker_threads");
const userRouter =  require("./routes/user.js")



const dburl = process.env.ATLAS_URL;
// const dburl = mongodb://127.0.0.1:27017/project




main().then((result)=>{
    console.log("connect to the Data base")
}).catch((err)=>{
    console.log(err)
})
async function main() {
    await mongoose.connect(dburl);
    
}


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"public")))


const store = new MongoStore({
    mongoUrl:dburl,
    crypto:{
        secret:"my secret is here..",
    },
    touchAfter:24 *3600,
})


const sessionOptions = {secret:"my secret is here..",
    store,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:new Date(Date.now()+2*24*60*60*1000),
        maxAge: 2*24*60*60*1000,
        httpOnly:true


    }

}



app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())







app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next()
})

app.get("/demouser",async(req,res)=>{
    let fakeuser = new User ({
        email:"abc@gmail.com",
        username:"raj"
    })

    let result = await User.register(fakeuser,"raj8080");
    res.send(result)



})



app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter)

   






app.use((req,res,next)=>{
  next(new ExpressError(401,"aa gya error"));
})
 

app.use((err,req,res,next)=>{
let{status=402,message="somthing wrong here..."} = err
// res.status(status).send(message)
res.render("./listings/error.ejs",{err})
  
})


app.listen(8080,()=>{
    console.log("Server is running ")
})