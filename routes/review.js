const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {reviewSchema} = require("../schemavalidation.js");
const Review = require("../models/review.js");
const { isLogin } = require("../middleware.js");
const { isReviewauther } = require("../middleware.js");
const reviewControler = require("../controlers/review.js")





const validateReview = (req,res,next)=>{

let {error} = reviewSchema.validate(req.body);

     if(error){
      throw new ExpressError(400,"data are required")
      
     }else{
      next()
     }
}



  router.post("/",  isLogin, validateReview, wrapAsync(reviewControler.newreview))

  router.delete("/:valueid",isLogin,isReviewauther,wrapAsync(reviewControler.deletereview)) 

  module.exports = router