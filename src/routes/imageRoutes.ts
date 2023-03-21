import express, { Router } from "express";
import generalImageController from "../controllers/Images/generalImageController";
const router: Router = express.Router();


router.post("/", generalImageController.createImage);

export default router;
