import express from "express";
import { UserController } from "../controller/UserController";
import { BandController } from "../controller/BandController";


export const userRouter = express.Router();
export const bandRouter = express.Router();


const userController = new UserController();
const bandController = new BandController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

bandRouter.post("/register", bandController.registerBand);