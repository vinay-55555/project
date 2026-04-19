const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main().then((result)=>{
    console.log("connect to the Data base")
    
}).catch((err)=>{
    console.log(err)
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}

const initDB = async()=>{
    await Listing.deleteMany({})
    initdata.data= initdata.data.map((obj)=>({ ...obj,owner:'69e345bde4acdf58ad5651e3'}))
    await Listing.insertMany(initdata.data);
    console.log("data was initilize")

}

initDB()

