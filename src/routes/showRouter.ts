import { ShowController } from "../controller/ShowController2";
import express from "express";



export const showRouter = express.Router();

const showController = new ShowController();

showRouter.get("/details", showController.getShowByWeekDay);



