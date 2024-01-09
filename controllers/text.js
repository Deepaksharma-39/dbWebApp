import Test from "../models/test.js";

// import csvParser from "json2csv"

export const getResult = async (req, res) => {

  try {
    const result = await Test.find();

    // Send the result as JSON
    if(result){
    res.status(200).json(result);
    }
  } catch (err) {
    console.error("test error : ", err);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export const downloadData = async (req, res) => {
  try {

    const userData=[];
    const result = await Test.find();

    if (result.length > 0) {
      const keys = Object.keys(result[0]);
    
      
      result.forEach((user)=>{
        // userData.push(user)
      })
    }

    

    // Send the result as JSON
    if(result){
    res.status(200).json(result);
    }
  } catch (err) {
    console.error("test error : ", err);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};


export const getPaginatedResult = async (req, res) => {

  
  let { page, pageSize } = req.query;
  try {
    // If "page" and "pageSize" are not sent we will default them to 1 and 50.
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 50;



    const articles = await Test.aggregate([
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      articles: {
        metadata: { totalCount: articles[0].metadata[0].totalCount, page, pageSize },
        data: articles[0].data,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};


export const test = async (req, res, next) => {
  try {
    const tests = req.body;

    await Test.insertMany(tests).then(function () {
      res.status(200).json({ success: true, message: "test Successfull" });
    }).catch(function (err) {
      res.status(400).json({
        success: true,
        error: err,
        message: "test failed",
      });
    });
  } catch (err) {
    console.error("test error : ", err);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export const update = async (req, res, next) => {
  try {
    const testData = req.body;

    
    const promises = testData?.map(async (item) => {
      const updatedTest = await Test.findByIdAndUpdate(item._id, {
        $set: { ...item },
      });
      return updatedTest;
    });

    Promise.all(promises).then(() => {
      res.status(200).json({ success: true, message: "Test update success" });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const findByCity = async (req, res, next) => {
  const { city } = req.params;

  try {
    const result = await Test.find({ CITY: { $regex: new RegExp(city, 'i') } });
    if(result){
      res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'No matching documents found.' });
      }
  } catch (err) {
    console.error("city find error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const findByName = async (req, res, next) => {
  const { name } = req.params;

  try {
    const result = await Test.find({ NAME: { $regex: new RegExp(name, 'i') } });
    if(result){
      res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'No matching documents found.' });
      }
  } catch (err) {
    console.error("name find error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const findByPan = async (req, res, next) => {
  const { pan } = req.params;

  try {
    const result = await Test.find({ PAN: String(pan) });
    if(result){
      res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'No matching documents found.' });
      }
  } catch (err) {
    console.error("pincode find error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const findByemail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const result = await Test.find({ EMAIL: { $regex: new RegExp(email, 'i') } });
    if(result){
      res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'No matching documents found.' });
      }
  } catch (err) {
    console.error("city find error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const findByPhone = async (req, res, next) => {
  const { phone } = req.params;
  
  try {
    const result = await Test.find({ 'MOBILE NO': { $regex: new RegExp(phone, 'i') } });
    if(result){
      res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'No matching documents found.' });
      }
  } catch (err) {
    console.error("pincode find error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const compareDataWithDB = async (req, res, next) => {
  try {
    const requestData = req.body; // Assuming the array of objects is in the request body

    console.log("requestData",requestData);
    // Extract phone numbers from the request data
    const phoneNumbers = requestData.map(item => item['MOBILE NO']);

    // Find existing data in the database based on phone numbers
    const existingData = await Test.find({ 'MOBILE NO': { $in: phoneNumbers } });

    const updatedData = [];
    // Identify new and old data
    const newData = requestData.filter(item => !existingData.some(existingItem => existingItem['MOBILE NO'] === String(item['MOBILE NO'])));
    const oldData = existingData;

    existingData.forEach(existingItem => {
      const matchingRequestItem = requestData.find(item => item['MOBILE NO'] === String(existingItem['MOBILE NO']));

      if (matchingRequestItem) {
        // Check for differences and add remarks if values are manipulated
        const remarks = getManipulatedValues(existingItem, matchingRequestItem);

        // Check if 'remarks' field exists in the existingItem
        const updatedItem = { ...existingItem };
        if (!updatedItem.hasOwnProperty('remarks')) {
          updatedItem.remarks = [];
        }

        // Add the remarks to the 'remarks' field
        updatedItem.remarks.push(...remarks);
        updatedData.push(updatedItem);
      }
    });


    // Return both new and old data
    res.status(200).json({ newData, oldData ,updatedData });
  } catch (err) {
    console.error("Data comparison error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const findByWhatsappStatus = async (req, res, next) => {
  const whatsappStatus = 'UNUSED'; // Value to match against

  try {
    const result = await Test.find({ "WHATS APP": { $regex: new RegExp(whatsappStatus, 'i') } });
    
    if (result && result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No matching documents found.' });
    }
  } catch (err) {
    console.error("whatsapp status find error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const findByBankNameAndStatus = async (req, res, next) => {
  const bankName = 'AXIS BANK';
  const bankStatus = 'REJECTED';

  try {
    const result = await Test.find({
      'LOGIN BANK': { $regex: new RegExp(bankName, 'i') },
      'BANKS STATUS': { $regex: new RegExp(bankStatus, 'i') },
    });

    if (result && result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No matching documents found.' });
    }
  } catch (err) {
    console.error("bank name and status find error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Helper function to identify manipulated values and return remarks
function getManipulatedValues(oldItem, newItem) {
  const remarks = [];

  // Compare each field in the objects
  for (const key in oldItem) {
    if (oldItem.hasOwnProperty(key) && newItem.hasOwnProperty(key)) {
      if (oldItem[key] !== newItem[key]) {
        remarks.push(`Value of ${key} changed from '${oldItem[key]}' to '${newItem[key]}'`);
      }
    }
  }

  return remarks;
}
