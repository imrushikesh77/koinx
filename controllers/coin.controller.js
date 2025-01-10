import Coin from "../models/coin.model.js";
import { calculateDeviation } from "../utils/calculateDeviation.util.js";

export const getStats = async (req, res) => {
    try {
        // Get the coin name from the request parameters
        const {coin} = req.params;


        // Find the coin in the database
        const coinData = await Coin.findOne({name: coin});

        // If the coin isn't found
        if (!coinData) {
            console.log(`Coin ${coin} not found, returning 404`);
            return res.status(404).json({ message: "Coin not found" });
        }
        
        // Return the coin data
        res.status(200).json({
            "price":coinData.currentPrice,
            "marketCap":coinData.marketCap,
            "24hChange":coinData["24hChange"]
        });
    } catch (err) {
        console.error(`Error in getStats: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
}

export const getDeviation = async (req, res) => {
    try {
        // Get the coin name from the request parameters
        const {coin} = req.params;

        // Find the coin in the database
        const coinData = await Coin.findOne({name: coin});

        // If the coin isn't found
        if (!coinData) {
            console.log(`Coin ${coin} not found, returning 404`);
            return res.status(404).json({ message: "Coin not found" });
        }

        // Calculate the deviation
        const deviation = calculateDeviation(coinData.pastPrice);

        // Return the deviation
        res.status(200).json(deviation);
    } catch (err) {
        console.error(`Error in getDeviation: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
}