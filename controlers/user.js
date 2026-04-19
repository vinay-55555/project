const User = require("../models/user.js");


module.exports.signupform = (req,res)=>{
    res.render("../views/users/signup.ejs")
}

module.exports.signup = async(req,res)=>{
try{
let{username,email,password} = req.body;
const newuser = new User({username,email})
const registeruser = await User.register(newuser,password);
console.log(registeruser)
req.login(registeruser,(err)=>{
    if(err){
        next(err);
    }
req.flash("success","new user added successfully")
res.redirect("/listings");
})

}catch(err){
req.flash("error",err.message);
res.redirect("/signup")

}

};

module.exports.loginform = (req,res)=>{
    res.render("../views/users/login.ejs")
}

module.exports.login = async(req,res)=>{
req.flash("success","Welcome back your account")
let redirectUrl =res.locals.redirectUrl ||"/listings"
res.redirect(redirectUrl);

}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logout ");
        res.redirect("/listings")
    }) 
}