import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashBoardPage";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/ComparePage";
import WatchlistPage from "./pages/WatchlistPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
// import Footer from "./components/common/footer/Footer";

const App = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor") as HTMLElement;
    const cursorPointer = document.getElementById(
      "cursor-pointer"
    ) as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorPointer.style.left = `${e.clientX}px`;
      cursorPointer.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      cursor.style.height = "0.5rem";
      cursor.style.width = "0.5rem";
      cursorPointer.style.height = "3rem";
      cursorPointer.style.width = "3rem";
    };

    const handleMouseUp = () => {
      cursor.style.height = "0.3rem";
      cursor.style.width = "0.3rem";
      cursorPointer.style.height = "2rem";
      cursorPointer.style.width = "2rem";
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="App">
      <div className="cursor" id="cursor" />
      <div className="cursor-pointer" id="cursor-pointer" />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
