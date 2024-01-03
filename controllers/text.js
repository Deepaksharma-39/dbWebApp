import Test from "../models/test.js";

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

export const test = async (req, res, next) => {
  try {
    const tests = req.body;

    await Test.insertMany(tests).then(function () {
      res.status(200).json({ success: true, message: "test Successfull" });
    }).catch(function (err) {
      console.log("insertMany error: ", err);
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

export const testUpdate = async (req, res, next) => {
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
    console.error("Test update error:", err);
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
  console.log(name)

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
    const result = await Test.find({ PAN: Number(pan) });
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

