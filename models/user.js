const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
      email:{
          type:String,
          require:true
      },
})

userSchema.plugin(passportLocalMongoose);

 // yha pass passport username password hash salting jiase ccheeze apne aap build kar deta hai
// maybe authentication ke bhe jarurat nhi padti hai jab hum passport ko use karte hai  
module.exports  = mongoose.model("User",userSchema);
 