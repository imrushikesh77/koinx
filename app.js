import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Importing the router
import coinDetailsRouter from "./routes/coin.route.js";

// Using the router
app.use("/api/v1/coin", coinDetailsRouter)

// Health check route
/*
Method: GET
Route: /health
Description: Check the health of the server
Access: Public
Response: {
    message: "Server is healthy!!"
}
*/
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy!!" });
});

export default app;