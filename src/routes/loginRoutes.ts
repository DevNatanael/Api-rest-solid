import express, { Router } from "express";
import generalTokenController from "../controllers/Token/generalTokenController";

const router: Router = express.Router();

// fazer login
router.post("/", generalTokenController.createToken);

export default router;
