const Listing = require("../models/listing.js")
const {listingSchema} = require("../schemavalidation.js");

const axios = require("axios");


module.exports.index = async(req,res)=>{
      const allListing =    await Listing.find()
      res.render("./listings/index.ejs",{allListing})
    }

    module.exports.createListing = (req,res)=>{
 
      res.render("./listings/new.ejs")
}

    module.exports.showListing =async(req,res)=>{
        let{id} = req.params;
          const allListing =    await Listing.findById(id).populate({path:"reviews",populate:{path:"auther"}}).populate("owner");
          if(!allListing){
          req.flash("error","Your Listing does not exist anymoore  ")
           return res.redirect("./listings")
    
          }
          console.log(allListing)
          res.render("./listings/show.ejs",{allListing})
          
        }

        module.exports.newListing = async (req,res,next)=>{
          
  const location = req.body.listing.location; // form se aayega

  const urlo = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${process.env.MAP_TOKEN}`;

  const response = await axios.get(urlo);

  const geometry = response.data.features[0].geometry;

  console.log(geometry);
          
            // let listing = req.body.listing;
            // console.log(listing)
        
            // if(!req.body.listing){     // jab koe hopscotce jaise raste se listing bhejta or uspe andar data he na ho to mongoose error de sata hai isliye ye jaroore hai  
            //   throw new ExpressError(400,"data are required")
            // }
        
            
        // let {error} = listingSchema.validate(req.body.listing);
        // console.log(error) 
        
        //      if(error.error){
        //       throw new ExpressError(400,"data are required")
              
        //      }

        let listing = {...req.body.listing};
            if(listing.image){
              listing.image = {url:listing.image};
            }
        
        let {error} = listingSchema.validate(req.body.listing);
        console.log(error) 
        
             if(error.error){
              throw new ExpressError(400,"data are required")
              
             }
             
             let url = req.file.path;
             let filename = req.file.filename
            const newlisting = new Listing(listing);
            newlisting.owner = req.user._id;
            newlisting.image  = {url, filename};
               let rs = newlisting.geometry  =geometry;
               console.log(rs)

              await newlisting.save()
              req.flash("success","New Listing Added Successfully")
              res.redirect("/listings")
          
        }

        module.exports.editform = async(req,res)=>{
            let{id} = req.params;
              console.log(id)
        
              const allListing =  await Listing.findById(id)
              console.log(allListing)
        
            res.render("./listings/edit.ejs",{allListing})
        
          }

          module.exports.putlistng = async(req,res)=>{
              let{id} = req.params;
          
          
              let listing = {...req.body.listing};

          //     if(listing.image){
          //       listing.image = {url:listing.image};
          //     }
          
          let {error} = listingSchema.validate({listing:listing});
          console.log(error) 
          
               if(error){
                throw new ExpressError(400,"data are required")
                
               }
            
             let resu =  await  Listing.findByIdAndUpdate(id,listing);
             if(typeof req.file !== "undefined"){
                  let url = req.file.path;
             let filename = req.file.filename
             resu.image = {url,filename}
             await resu.save()
             }
                req.flash("success","Listing update Successfully")
          
              res.redirect("/listings");
                 
            }
      module.exports.deletelisting = async(req,res)=>{
          let{id} = req.params;
             let deletelisting =  await  Listing.findByIdAndDelete(id);
          res.redirect("/listings");
          // console.log(deletelisting)
              
        };