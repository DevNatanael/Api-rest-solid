import express, { Router } from "express";
import generalTokenController from "../controllers/Token/generalTokenController";

const router: Router = express.Router();

router.post("/", generalTokenController.createToken);

export default router;
