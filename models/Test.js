import mongoose from "mongoose";


const textSchema= new mongoose.Schema( {
      "MOBILE NO": String,
      "CITY":String,
    },
  { strict:false,timestamps: true })


const Test=mongoose.model("Test",textSchema);

export default Test;