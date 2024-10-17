import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { convertNumber } from "../../../utils/convertNumber";
import { motion } from "framer-motion";
import { Tooltip, IconButton } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { addToWatchlist } from "../../../utils/addToWatchlist";
import { hasBeenAdded } from "../../../utils/hasBeenAdded";
import { removeFromWatchlist } from "../../../utils/removeFromWatchlist";
import { CoinSummary } from "../../../types/coin-item";
import { Link } from "react-router-dom";

interface ListProps {
  coin: CoinSummary;
  delay: number;
  isWatchlistPage?: boolean;
}

const List: React.FC<ListProps> = ({ coin, delay, isWatchlistPage }) => {
  const [added, setAdded] = useState<boolean>(hasBeenAdded(coin.id));

  return (
    <motion.tr
      style={{ display: isWatchlistPage && !added ? "none" : "table-row" }}
      className="list-row"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Tooltip placement="bottom-start" title="Image">
        <td className="td-img">
          <Link to={`/coin/${coin.id}`}>
            <img src={coin.image} className="coin-image" alt={coin.name} />
          </Link>
        </td>
      </Tooltip>
      <Tooltip placement="bottom-start" title="Info">
        <td className="td-info-flex">
          <Link to={`/coin/${coin.id}`}>
            <div className="coin-name-flex">
              <h3 className="coin-symbol coin-symbol-list">{coin.symbol}</h3>
              <p className="coin-name coin-name-list">{coin.name}</p>
            </div>
          </Link>
        </td>
      </Tooltip>
      <Tooltip placement="bottom-start" title="Price">
        <td className="td-price-chip-list">
          <Link to={`/coin/${coin.id}`}>
            {coin.price_change_percentage_24h > 0 ? (
              <div className="info-flex" style={{ marginBottom: 0 }}>
                <div className="price-chip price-chip-list">
                  {coin.price_change_percentage_24h.toFixed(2)} %
                </div>
                <TrendingUpRoundedIcon className="trending-icon trending-icon-list" />
              </div>
            ) : (
              <div className="info-flex" style={{ marginBottom: 0 }}>
                <div className="price-chip price-chip-list red">
                  {coin.price_change_percentage_24h.toFixed(2)} %
                </div>
                <TrendingDownRoundedIcon className="trending-icon red trending-icon-list" />
              </div>
            )}
          </Link>
        </td>
      </Tooltip>
      <Tooltip placement="bottom-start" title="Current Price">
        <td>
          <Link to={`/coin/${coin.id}`}>
            <p
              className={`coin-price coin-price-list desktop-price ${
                coin.price_change_percentage_24h < 0 ? "coin-price-red" : ""
              }`}
            >
              ${coin.current_price.toLocaleString()}
            </p>
            <p
              className={`coin-price coin-price-list mobile-price ${
                coin.price_change_percentage_24h < 0 ? "coin-price-red" : ""
              }`}
            >
              $
              {convertNumber(
                coin.current_price < 1
                  ? parseFloat(coin.current_price.toString()).toFixed(3)
                  : parseInt(coin.current_price.toFixed(0))
              )}
            </p>
          </Link>
        </td>
      </Tooltip>
      <Tooltip placement="bottom-start" title="Total Volume">
        <td className="td-mkt-cap">
          <Link to={`/coin/${coin.id}`}>
            <span className="coin-total_volume">
              {coin.total_volume.toLocaleString()}
            </span>
          </Link>
        </td>
      </Tooltip>
      <Tooltip placement="bottom-start" title="Market Cap">
        <td className="td-mkt-cap">
          <Link to={`/coin/${coin.id}`}>
            <span className="coin-total_volume">
              ${coin.market_cap.toLocaleString()}
            </span>
          </Link>
        </td>
      </Tooltip>
      <Tooltip placement="bottom-start" title="Market Cap">
        <td className="mobile-td-cap">
          <Link to={`/coin/${coin.id}`}>
            <span className="coin-total_volume coin-total_volume-list">
              ${convertNumber(parseFloat(coin.market_cap.toString()))}
            </span>
          </Link>
        </td>
      </Tooltip>
      <td style={{ width: "fit-content" }}>
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
                coin.price_change_percentage_24h < 0 ? "watchlist-icon-red" : ""
              } `}
            />
          ) : (
            <StarBorderRoundedIcon
              className={`watchlist-icon ${
                coin.price_change_percentage_24h < 0 ? "watchlist-icon-red" : ""
              } `}
            />
          )}
        </IconButton>
      </td>
    </motion.tr>
  );
};

export default List;
