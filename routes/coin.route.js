import express from "express";

// Import the controller functions
import {
    getStats,
    getDeviation,
    handler
} from "../controllers/coin.controller.js";

const router = express.Router();

// Define the routes

/*
Method: GET
Route: /api/v1/coin/stats/:coin
Description: Get the stats of a coin
Access: Public
Response: {
    price,
    marketCap,
    24hChange
}
*/
router.get("/stats/:coin", getStats)

/*
Method: GET
Route: /api/v1/coin/deviation/:coin
Description: Get the deviation of a coin for the last 100 records
Access: Public
Response: {
    deviation
}
*/
router.get("/deviation/:coin", getDeviation)

router.get("/update-price", handler);

export default router;