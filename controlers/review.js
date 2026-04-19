const Review = require("../models/review.js");
const Listing = require("../models/listing.js")


module.exports.newreview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    console.log(listing)
    let newReview = new Review(req.body.review);
    newReview.auther = req.user._id;
    console.log(newReview)
    listing.reviews.push(newReview);
    await newReview.save()
    await listing.save()
      req.flash("success","Listing update Successfully")

    res.redirect("/listings")
               
  }

 module.exports.deletereview = async(req,res)=>{
      let {id,valueid} = req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{reviews:valueid}});
      await Review.findByIdAndDelete (valueid)
      req.flash("success","rivew deleted succesfully")
      res.redirect("/listings")
    }