import axios from 'axios';

async function triggerPriceUpdate() {
  try {
    const response = await axios.get('https://koinx-api.vercel.app/api/v1/coin/update-price');
    console.log('Price update job completed:', response.data);
  } catch (error) {
    console.error('Error occurred while updating prices:', error);
  }
}

triggerPriceUpdate();
