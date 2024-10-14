import { useEffect } from "react";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import "./styles.css";

const TopButton = () => {
  useEffect(() => {
    const mybutton = document.getElementById("myBtn");

    const scrollFunction = (): void => {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        if (mybutton) {
          mybutton.style.display = "flex";
        }
      } else {
        if (mybutton) {
          mybutton.style.display = "none";
        }
      }
    };

    window.onscroll = scrollFunction;

    return () => {
      window.onscroll = null; // Clean up the event listener
    };
  }, []);

  const topFunction = (): void => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="top-btn" id="myBtn" onClick={topFunction}>
      <NorthRoundedIcon className="top-icon" sx={{ fontSize: "2rem" }} />
    </div>
  );
};

export default TopButton;
