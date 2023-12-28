import mongoose from "mongoose";


const textSchema= new mongoose.Schema( {
    id: String,
      title: String,
      content: String,
      category: String
    },
  { strict:false,timestamps: true })


const Test=mongoose.model("Test",textSchema);

export default Test;