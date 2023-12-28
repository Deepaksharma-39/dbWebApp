import express from "express";
import { getResult, test, testUpdate } from "../controllers/text.js";

const testRouter = express.Router();

testRouter.post('/test', test);

testRouter.post('/update', testUpdate);

testRouter.get('/read', getResult);

export default testRouter;