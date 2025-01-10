import dotenv from "dotenv";
import logger from "./logger.util.js";
import axios from "axios";
import Coin from "../models/coin.model.js";

dotenv.config();

const COINGECKO_API_URL = process.env.COINGECKO_API_URL;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

export const updatePriceAfterEveryTwoHours = async () => {
    logger.info("Starting the background job to update coin prices...");

    const updatePrices = async () => {
        try {
            // Fetch the list of coins you want to update
            const coins = await Coin.find();

            if (!coins || coins.length === 0) {
                logger.warn("No coins found to update");
                return;
            }

            // Fetch the price for each coin from the API
            for (const coin of coins) {
                logger.info(`Updating price for ${coin.name}...`);
                // Make the API call to fetch coin data
                const options = {
                    method: 'GET',
                    url: `${COINGECKO_API_URL}/coins/${coin.name}`,
                    headers: {
                        accept: 'application/json',
                        'x-cg-demo-api-key': `${COINGECKO_API_KEY}`,
                    }
                  };
                let response; 
                await axios
                    .request(options)
                    .then(function (res) {
                        response = res.data;
                    })
                    .catch((err)=>{
                        logger.error(`${err.message}`);
                    })
                const { market_data } = response;

                // Extract necessary data from the API response
                const currentPrice = market_data?.current_price.usd;
                const marketCap = market_data?.market_cap.usd;
                const change24h = market_data?.price_change_percentage_24h;

                // Prepare the new price data
                const newPriceData = {
                    price: currentPrice,
                    dateTime: new Date(),
                };

                // Update the `currentPrice`, `marketCap`, `"24hChange"`, and `pastPrice` fields
                coin.currentPrice = currentPrice;
                coin.marketCap = marketCap;
                coin["24hChange"] = change24h;
                coin.pastPrice.push(newPriceData);
                if (coin.pastPrice.length >= 100) {
                    log.info("Removing the oldest entry from pastPrice to keep only 100 records");
                    coin.pastPrice.shift(); // Remove the oldest entry
                }

                // Save the updated coin document
                await coin.save();
            }
        } catch (err) {
            logger.error(`Error in updating price: ${err.message}`);
        }
    };

    // Run the function every 2 hours (2 hours = 7200000 ms)
    setInterval(updatePrices, process.env.PRICE_UPDATE_INTERVAL);

    // Run the function immediately on startup
    await updatePrices();
};
