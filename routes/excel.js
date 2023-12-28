import express from "express";
import readExcelController from "../controllers/excel.js";

const excelRouter = express.Router();

excelRouter.get('/read-excel',readExcelController);

export default excelRouter;