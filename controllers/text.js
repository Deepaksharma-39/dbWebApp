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
    const test = req.body;

    const promises = test.map(async (item) => {
      const res = await Test.findByIdAndUpdate(item._id, {
        $set: { ...item },
      });
      return res;
    });

    Promise.all(promises).then(() => {
      res.json({ success: true, message: "test update success" });
    });
  } catch (err) {
    console.error("test update error : ", err);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
