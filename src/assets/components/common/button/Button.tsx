import React from "react";
import "./styles.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  outlined?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, outlined }) => {
  return (
    <div className={outlined ? "btn-outlined" : "btn-div"} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
