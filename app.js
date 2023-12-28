import express from "express";
import cors from "cors";
import connection from "./config.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import testRouter from "./routes/test.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Parse JSON request body
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
  res.send("Welcome to homepage")
})

// Define authentication routes
app.use('/auth', authRouter);

// Define user routes
app.use('/user', userRouter);

// read excel sheets
app.use('/excel',testRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});