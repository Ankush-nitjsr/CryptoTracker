import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import "./styles.css";

interface PriceToggleProps {
  priceType: string;
  handlePriceTypeChange: (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => void;
}

const PriceToggle: React.FC<PriceToggleProps> = ({
  priceType,
  handlePriceTypeChange,
}) => {
  return (
    <div className="toggle-div">
      <ToggleButtonGroup
        color="primary"
        value={priceType}
        exclusive
        onChange={handlePriceTypeChange}
        sx={{
          "&.Mui-selected": {
            color: "var(--blue) !important",
          },
          borderColor: "var(--blue)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "unset",
            color: "var(--blue)",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue)",
          },
        }}
      >
        <ToggleButton value="prices" className="toggle-btn">
          Price
        </ToggleButton>
        <ToggleButton value="total_volumes" className="toggle-btn">
          Total Volume
        </ToggleButton>
        <ToggleButton value="market_caps" className="toggle-btn">
          Market Cap
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default PriceToggle;
