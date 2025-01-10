import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Coin from "../models/coin.model.js";

const seedCoins = async () => {
    // List of coins to seed
    const coins = [
        {
            name: "bitcoin",
            marketCap: 0,
            currentPrice: 0,
            pastPrices: [],
            "24hChange": 0,
        },
        {
            name: "matic-network",
            marketCap: 0,
            currentPrice: 0,
            pastPrices: [],
            "24hChange": 0,
        },
        {
            name: "ethereum",
            marketCap: 0,
            currentPrice: 0,
            pastPrices: [],
            "24hChange": 0,
        },
    ];

    try {
        for (const coin of coins) {
            // Check if the coin already exists
            const existingCoin = await Coin.findOne({ name: coin.name });
            if (!existingCoin) {
                // Insert the coin
                await Coin.create(coin);
                console.log(`Coin ${coin.name} seeded.`);
            } else {
                console.log(`Coin ${coin.name} already exists.`);
            }
        }
        console.log("Coins seeded successfully.");
    } catch (err) {
        console.error(`Error seeding coins: ${err.message}`);
    }
};

const connectDB = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);

        // Seed coins if the database is empty
        await seedCoins();
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
