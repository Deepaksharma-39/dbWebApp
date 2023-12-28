import mongoose from "mongoose";


const excelSchema= new mongoose.Schema( {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique:true
    },
    pan: {
      type: String,
      unique:true
    },
    city: {
      type: String,
      unique:true
    },
    company : {
      type: String,
      unique:true
    },
    details1: {
      type: String,
      unique:true
    },
    details2: {
      type: String,
      unique:true
    },
    details3: {
      type: String,
      unique:true
    },
    details4: {
      type: String,
      unique:true
    },
    details5: {
      type: String,
      unique:true
    },
    details6: {
      type: String,
      unique:true
    },
    whatsapp: {
      type: String,
      enum: ['USED', 'FRESH'],
      default: 'USED'
    },
    whatsappDate:{
        type: Date,
    },
    whatsapp: {
      type: String,
      enum: ['USED', 'FRESH'],
      default: 'USED'
    },
    whatsappDate:{
        type: Date,
    },
    IVR
: {
      type: String,
      enum: ['USED', 'FRESH'],
      default: 'USED'
    },
    IVRDate:{
        type: Date,
    },
    EMAIL: {
      type: String,
      enum: ['USED', 'FRESH'],
      default: 'USED'
    },
    EMAILDate:{
        type: Date,
    },
    SMS: {
      type: String,
      enum: ['USED', 'FRESH'],
      default: 'USED'
    },
    SMSDate:{
        type: Date,
    },
    CALLING: {
      type: String,
      enum: ['USED', 'FRESH'],
      default: 'USED'
    },
    CALLINGDate:{
        type: Date,
    },
    CALLING: {
        type: String,
      enum: ['USED', 'FRESH'],
      default: 'USED'
    },
    CALLINGDate:{
        type: Date,
    },
    BANK1: {
      type: String
    },
    BANK1Date:{
        type: Date,
    },
    BANK1status:{
        type: String,
        enum: ['APPROVED', 'DECLINED',''],
        default: ''
    },
    REMARKS:{
          
    }

   
  },
  { timestamps: true })


const Excel=mongoose.model("User",excelSchema);

export default Excel;