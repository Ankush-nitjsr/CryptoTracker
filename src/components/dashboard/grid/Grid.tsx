import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { addToWatchlist } from "../../../utils/addToWatchlist";
import { hasBeenAdded } from "../../../utils/hasBeenAdded";
import { removeFromWatchlist } from "../../../utils/removeFromWatchlist";
import { CoinSummary } from "../../../types/coin-item";
import { Link } from "react-router-dom";

interface GridProps {
  coin: CoinSummary;
  delay: number;
  isWatchlistPage?: boolean;
}

const Grid: React.FC<GridProps> = ({ coin, delay, isWatchlistPage }) => {
  const [added, setAdded] = useState<boolean>(hasBeenAdded(coin.id));

  return (
    <Link to={`/coin/${coin.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 ? "grid-container-red" : ""
        }`}
        style={{ display: isWatchlistPage && !added ? "none" : undefined }}
      >
        <div className="info-flex">
          <div className="coin-info-flex">
            <img src={coin.image} className="coin-image" alt={coin.name} />
            <div className="coin-name-flex">
              <h3 className="coin-symbol">{coin.symbol}</h3>
              <p className="coin-name">{coin.name}</p>
            </div>
          </div>

          <IconButton
            onClick={(e) => {
              e.preventDefault();
              if (added) {
                removeFromWatchlist(coin.id);
                setAdded(false);
              } else {
                addToWatchlist(coin.id);
                setAdded(true);
              }
            }}
          >
            {added ? (
              <StarRoundedIcon
                className={`watchlist-icon ${
                  coin.price_change_percentage_24h < 0
                    ? "watchlist-icon-red"
                    : ""
                }`}
                sx={{ fontSize: "2rem !important" }}
              />
            ) : (
              <StarBorderRoundedIcon
                className={`watchlist-icon ${
                  coin.price_change_percentage_24h < 0
                    ? "watchlist-icon-red"
                    : ""
                }`}
                sx={{ fontSize: "2rem !important" }}
              />
            )}
          </IconButton>
        </div>

        {coin.price_change_percentage_24h > 0 ? (
          <div className="coin-info-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)} %
            </div>
            <TrendingUpRoundedIcon className="trending-icon" />
          </div>
        ) : (
          <div className="coin-info-flex">
            <div className="price-chip red">
              {coin.price_change_percentage_24h.toFixed(2)} %
            </div>
            <TrendingDownRoundedIcon className="trending-icon red" />
          </div>
        )}
        <p
          className={`coin-price ${
            coin.price_change_percentage_24h < 0 ? "coin-price-red" : ""
          }`}
        >
          ${coin.current_price.toLocaleString()}
        </p>
        <p className="coin-name-2">
          Total Volume:
          <span className="coin-total_volume">
            {" "}
            {coin.total_volume.toLocaleString()}
          </span>
        </p>
        <p className="coin-name-2">
          Market Cap:
          <span className="coin-total_volume">
            {" "}
            ${coin.market_cap.toLocaleString()}
          </span>
        </p>
      </motion.div>
    </Link>
  );
};

export default Grid;
