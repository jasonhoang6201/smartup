import { Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss";

type Props = {
  onClose: () => void;
};

const Search = (props: Props) => {
  const navigate = useNavigate();
  const { onClose = () => {} } = props;
  const [value, setValue] = React.useState("");

  const handleSearch = (value: string) => {
    navigate(`/search?keyword=${value}`);
  };

  return (
    <div className="search-overlay" onClick={() => onClose()}>
      <div className="search-container" onClick={(e) => e.stopPropagation()}>
        <Input
          className="custom-input"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Search;
