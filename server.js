import dotenv from "dotenv";
dotenv.config();

// Importing app from app.js
import app from "./app.js";

// Importing connectDB from config/connectDB.js
import connectDB from "./config/connectDB.config.js";

// Import background job to update prices
import { updatePriceAfterEveryTwoHours } from "./utils/updatePrice.util.js";

// Fetching port from env file
const PORT = process.env.PORT || 3333;

// Connecting to database and starting server
connectDB()
    .then(()=>{
        // Start the server
        app.listen(PORT, ()=>{
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
            // Start the background job to update prices
            updatePriceAfterEveryTwoHours();
        })
    })
    .catch((err)=>{
        console.error(`${err.message}`);
    })

