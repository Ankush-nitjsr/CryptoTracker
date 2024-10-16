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

// Define the Coin interface
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  // Add other fields as needed
}

// Type guard to check if the error is an instance of Error
const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const get100Coins = async (): Promise<Coin[] | undefined> => {
  try {
    const response = await axios.get<Coin[]>(
      `${baseAPIURL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      options
    );
    console.log("RESPONSE>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    if (isError(error)) {
      console.error("ERROR>>>", error.message);
    } else {
      console.error("Unknown error occurred");
    }
  }
};
