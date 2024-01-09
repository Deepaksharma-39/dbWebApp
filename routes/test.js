import express from "express";
import { compareDataWithDB, findByBankNameAndStatus, findByCity, findByName, findByPan, findByPhone, findByWhatsappStatus, findByemail, getPaginatedResult, getResult, test, update } from "../controllers/text.js";

const testRouter = express.Router();

testRouter.post('/test', test);

testRouter.post('/update', update);

testRouter.post('/compare', compareDataWithDB);

testRouter.get('/read', getResult);

testRouter.get(`/readPagination`, getPaginatedResult);

testRouter.get('/findByCity/:city', findByCity);

testRouter.get('/findByName/:name', findByName);

testRouter.get('/findByemail/:email', findByemail);

testRouter.get('/findByPan/:pan', findByPan);

testRouter.get('/findByPhone/:phone', findByPhone);

testRouter.get('/findByWhatsappStatus', findByWhatsappStatus);

testRouter.get('/findByBankNameAndStatus', findByBankNameAndStatus);

export default testRouter;