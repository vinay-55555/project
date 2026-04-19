const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {listingSchema} = require("../schemavalidation.js");
const {isLogin,isOwner}    = require("../middleware.js")
const listingControler = require("../controlers/listing.js")
const multer  = require('multer')
const{storage} = require("../cloudConfi.js")
const upload = multer({ storage });










const validateListing = (req,res,next)=>{

let {error} = listingSchema.validate(req.body.listing);

     if(error){
      throw new ExpressError(400,"data are required")
      
     }else{
      next()
     }
}


router.route("/")
      .get((listingControler.index))    
      .post(isLogin,upload.single('listing[image]'),wrapAsync(listingControler.newListing));


router.get("/new",isLogin,(listingControler.createListing));


router.get("/:id/edit",isLogin,(listingControler.editform));


router.route("/:id")
  .put(isLogin,upload.single('listing[image]'),(listingControler.putlistng))
  .delete(isLogin,isOwner,(listingControler.deletelisting));

      






    
router.get("/:id/show",(listingControler.showListing));


// app.post("/listings",async (req,res,next)=>{
//   try{ 
//     // let listing = req.body.listing;
//     const newlisting = new Listing(req.body.listing);
//       await newlisting.save()
//       res.redirect("/listings")
//   }catch(err){
//     next(err)
//   }
//   }); 



 


  module.exports = router;
