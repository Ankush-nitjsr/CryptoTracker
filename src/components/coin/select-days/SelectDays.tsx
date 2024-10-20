import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import "./styles.css";

interface SelectDaysProps {
  days: number;
  handleDaysChange: (event: SelectChangeEvent<number>) => void;
  noText?: boolean;
}

const SelectDays: React.FC<SelectDaysProps> = ({
  days,
  handleDaysChange,
  noText,
}) => {
  return (
    <div className="select-days">
      {!noText && <p>Price Change in </p>}
      <Select
        value={days}
        onChange={handleDaysChange}
        sx={{
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
        }}
        className={noText ? "select-coin" : ""}
      >
        <MenuItem value={7}>7 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
        <MenuItem value={60}>60 Days</MenuItem>
        <MenuItem value={90}>90 Days</MenuItem>
        <MenuItem value={120}>120 Days</MenuItem>
      </Select>
    </div>
  );
};

export default SelectDays;
