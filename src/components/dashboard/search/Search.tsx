import React from "react";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface SearchComponentProps {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  search,
  onChange,
}) => {
  return (
    <div className="search-box">
      <SearchRoundedIcon style={{ color: "var(--grey)", fontSize: "1.5rem" }} />
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={search}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchComponent;
