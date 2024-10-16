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

// Define the MarketChartData interface based on the expected response structure
interface MarketChartData {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
  // Add other fields if needed based on the API response
}

// Type guard to handle errors
const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getPrices = async (
  id: string,
  days: number,
  priceType: "market_caps" | "total_volumes" | "prices",
  setError?: (value: boolean) => void
): Promise<Array<[number, number]> | undefined> => {
  try {
    const response = await axios.get<MarketChartData>(
      `${baseAPIURL}coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      options
    );

    if (response.data) {
      console.log("Prices>>>", response.data);

      if (priceType === "market_caps") {
        return response.data.market_caps;
      } else if (priceType === "total_volumes") {
        return response.data.total_volumes;
      } else {
        return response.data.prices;
      }
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
