import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import SelectDays from "../../coin/select-days/SelectDays";
import "./styles.css";

interface Coin {
  id: string;
  name: string;
}

interface SelectCoinProps {
  allCoins: Coin[];
  coin1: string;
  coin2: string;
  days: number;
  handleCoinChange: (
    event: SelectChangeEvent<string>,
    isCoin1: boolean
  ) => void;
  handleDaysChange: (event: SelectChangeEvent<number>) => void;
}

const SelectCoin: React.FC<SelectCoinProps> = ({
  allCoins,
  coin1,
  coin2,
  days,
  handleCoinChange,
  handleDaysChange,
}) => {
  const selectStyle = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  return (
    <div className="select-flex">
      <p>Crypto 1</p>
      <Select
        className="select-coin"
        value={coin1}
        onChange={(e) => handleCoinChange(e, true)}
        sx={selectStyle}
      >
        {allCoins
          .filter((coin) => coin.id !== coin2)
          .map((coin, index) => (
            <MenuItem key={index} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>

      <p>Crypto 2</p>
      <Select
        className="select-coin"
        value={coin2}
        onChange={(e) => handleCoinChange(e, false)}
        sx={selectStyle}
      >
        {allCoins
          .filter((coin) => coin.id !== coin1)
          .map((coin, index) => (
            <MenuItem key={index} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>

      <SelectDays
        days={days}
        handleDaysChange={handleDaysChange}
        noText={true}
      />
    </div>
  );
};

export default SelectCoin;
