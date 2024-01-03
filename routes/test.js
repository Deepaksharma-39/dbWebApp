import express from "express";
import { findByCity, findByName, findByPan, findByPhone, findByemail, getResult, test, testUpdate } from "../controllers/text.js";

const testRouter = express.Router();

testRouter.post('/test', test);

testRouter.post('/update', testUpdate);

testRouter.get('/read', getResult);

testRouter.get('/findByCity/:city', findByCity);

testRouter.get('/findByName/:name', findByName);

testRouter.get('/findByemail/:email', findByemail);

testRouter.get('/findByPan/:pan', findByPan);

testRouter.get('/findByPhone/:phone', findByPhone);

export default testRouter;