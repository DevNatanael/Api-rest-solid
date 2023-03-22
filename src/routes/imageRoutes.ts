import express, { Router } from "express";
import imageController from "../controllers/Images/imageController";

const router: Router = express.Router();

router.post("/", imageController.create);

export default router;
