const joi = require('joi');
module.exports.listingSchema = joi.object({
listing:joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    country:joi.string().required(),
    price:joi.number().required(),
    image:joi.string()



}).required(),

})


module.exports.reviewSchema = joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
    }).required(),
})

// ff1583386_db_user
// gFjdWG69GHV7q4yi

// mongodb+srv://ff1583386_db_user:gFjdWG69GHV7q4yi@cluster0.zokr8e7.mongodb.net/
// mongodb+srv://ff1583386_db_user:gFjdWG69GHV7q4yi@cluster0.zokr8e7.mongodb.net/?appName=Cluster0