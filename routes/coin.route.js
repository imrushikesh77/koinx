import express from "express";

// Import the controller functions
import {
    getStats,
    getDeviation
} from "../controllers/coin.controller.js";

const router = express.Router();



export default router;