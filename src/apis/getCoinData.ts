import axios from "axios";

const baseAPIURL = "https://api.coingecko.com/api/v3/";
const apiKey = "CG-hUmMF79bdfzTsBY1KowWPA57";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": apiKey,
  },
};

// Define the CoinData interface based on the expected structure of the response
interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
  // Add other fields if needed based on the API response
}

// Type guard to handle errors
const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getCoinData = async (
  id: string,
  setError?: (value: boolean) => void
): Promise<CoinData | undefined> => {
  try {
    const response = await axios.get<CoinData>(
      `${baseAPIURL}coins/${id}`,
      options
    );

    if (response.data) {
      return response.data;
    }
  } catch (error: unknown) {
    if (isError(error)) {
      console.log(error.message);
    } else {
      console.error("Unknown error occurred");
    }

    if (setError) {
      setError(true);
    }
  }
};
