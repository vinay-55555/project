const Listing = require("./models/listing")
const Review = require("./models/review")

module.exports.isLogin = (req,res,next)=>{
    // console.log(req.user)
     if(!req.isAuthenticated()){ 
        req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must to login first");
    return res.redirect("/login")
  }
  next();
}


module.exports.saveRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl  = req.session.redirectUrl
    }
    next()
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner")
        return res.redirect(`/listing/${id}`)
    }
   next()
}



module.exports.isReviewauther = async(req,res,next)=>{
    let {id,valueid} = req.params;
    let review = await Review.findById(valueid);
    if(!review.auther._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this review")
        return res.redirect(`/listing/${id}`)
    }
   next()
}