import { updatePriceAfterEveryTwoHours } from "../utils/updatePrice.util.js";

export default async function handler(req, res) {
    try {
      await updatePriceAfterEveryTwoHours(); // Call your background job
      res.status(200).send('Price update job completed successfully');
    } catch (error) {
      res.status(500).send('Error occurred while updating prices');
    }
  }