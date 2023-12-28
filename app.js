import express from "express";
import connection from "./config.js";
import userModel from "./models/User.js";
import Jwt from "jsonwebtoken";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import excelRouter from "./routes/excel.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connection();

// Parse JSON request body
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Welcome to homepage")
})

// Define authentication routes
app.use('/auth', authRouter);

// Define user routes
app.use('/user', userRouter);

// read excel sheets
app.use("/excel",excelRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});