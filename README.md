
# KoinX Backend

This is a simple Express-based backend that provides APIs for fetching cryptocurrency data, including statistics, deviation, and a scheduled price update.

## Features

- **Get Coin Stats**: Retrieves the price, market cap, and 24-hour change of a specific cryptocurrency.
- **Get Coin Deviation**: Fetches the deviation of a specific coin based on the last 100 records.
- **Scheduled Price Update**: A background task to update the coin price at a regular interval.

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root of the project and add the necessary variables, such as the API keys and endpoints.

   ```bash
   COINGECKO_API_KEY=your-api-key
   COINGECKO_API_URL=your-api-url
   MONGO_URI=your-mongo-uri
   PORT=give-port

   ```

## Available Endpoints

### 1. Get Coin Stats
- **Method**: `GET`
- **Route**: `/api/v1/coin/stats/:coin`
- **Description**: Retrieves the stats of a coin (price, market cap, 24h change).
- **Parameters**: 
  - `coin`: The cryptocurrency symbol (e.g., `bitcoin`, `ethereum`).
- **Response**:

  ```json
  {
    "price": <price_in_usd>,
    "marketCap": <market_cap_in_usd>,
    "24hChange": <percentage_change_in_24h>
  }
  ```

### 2. Get Coin Deviation
- **Method**: `GET`
- **Route**: `/api/v1/coin/deviation/:coin`
- **Description**: Retrieves the deviation of a coin for the last 100 records.
- **Parameters**: 
  - `coin`: The cryptocurrency symbol (e.g., `bitcoin`, `ethereum`).
- **Response**:

  ```json
  {
    "deviation": <deviation_value>
  }
  ```

### 3. Update Coin Prices
- **Method**: `GET`
- **Route**: `/api/v1/coin/update-price`
- **Description**: Triggers a background job to update the price at 2 hours.
- **Response**:

  ```json
  {
    "message": "Price update job completed successfully"
  }
  ```

## Background Jobs

The `/update-price` endpoint is used to trigger a background job that updates the coin prices periodically (every two hours). You can modify the interval based on your needs.

## Running Locally

1. Start the server:

   ```bash
   npm start
   ```

   This will start the server on `http://localhost:3000` (or whichever port is specified in your `.env` file).

2. Access the API endpoints:
   - `GET /api/v1/coin/stats/:coin`
   - `GET /api/v1/coin/deviation/:coin`
   - `GET /api/v1/coin/update-price`

## Deployment

To deploy the application to a platform like Heroku, Vercel, or any other cloud service, follow the respective platform's deployment instructions, ensuring to add the required environment variables (`COINGECKO_API_KEY`, `COINGECKO_API_URL`).

## Technologies Used

- Node.js
- Express.js
- CoinGecko API (for cryptocurrency data)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.