import axios from "axios";
import { HistoricalChatData } from "../types/chart-data";

const baseAPIURL = "https://api.coingecko.com/api/v3/";
const apiKey = "CG-hUmMF79bdfzTsBY1KowWPA57";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": apiKey,
  },
};

export const getCoinPrices = async (
  id: string,
  days: number,
  priceType: string
) => {
  const prices = await axios
    .get<HistoricalChatData>(
      `${baseAPIURL}coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      options
    )
    .then((response) => {
      if (priceType == "market_caps") {
        return response.data.market_caps;
      } else if (priceType == "total_volumes") {
        return response.data.total_volumes;
      } else {
        return response.data.prices;
      }
    })
    .catch((error) => {
      console.log("ERROR>>>", error);
    });

  if (prices) {
    return prices;
  } else {
    return;
  }
};
