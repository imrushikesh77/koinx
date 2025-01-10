import logger from "./logger.util.js";

export const calculateDeviation = (pastPrices) => {
    try {
        // Ensure that we have a sufficient number of prices (at least 2)
        if (pastPrices.length <= 1) {
            logger.warn("Insufficient data to calculate deviation");
            return 0;  // No deviation if there are 0 or 1 price points
        }

        // Get the latest 100 prices or all if there are fewer than 100
        if (pastPrices.length > 100) {
            logger.warn("Truncating past prices to 100 records");
            pastPrices = pastPrices.slice(pastPrices.length - 100);
        }

        const totalPrices = pastPrices.length;

        if (totalPrices <= 2) {
            logger.warn("Insufficient data to calculate deviation");
            return 0;  // No deviation if there are 0 or 1 price points
        }

        // Calculate the sum of prices
        const sum = pastPrices.reduce((acc, curr) => acc + curr.price, 0);

        // Calculate the average price
        const average = sum / totalPrices;

        // Calculate squared deviations from the average
        const squaredDeviations = pastPrices.map((price) => Math.pow(price.price - average, 2));

        // Calculate the sum of squared deviations
        const sumSquaredDeviation = squaredDeviations.reduce((acc, curr) => acc + curr, 0);

        // Calculate the variance (divide by totalPrices - 1 for sample variance)
        const variance = sumSquaredDeviation / (totalPrices - 1);

        // Calculate the standard deviation
        const standardDeviation = Math.sqrt(variance);

        return standardDeviation;
    } catch (err) {
        logger.error(`Error in calculating deviation: ${err.message}`);
    }
};
