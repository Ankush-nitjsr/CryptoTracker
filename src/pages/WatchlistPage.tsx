import { useEffect, useState } from "react";
import Button from "../components/common/button/Button";
import Header from "../components/common/header/Header";
import Loader from "../components/common/loader/Loader";
import TabsComponent from "../components/dashboard/tabs/Tabs";
import { getCoins } from "../apis/getCoins";
import { CoinSummary } from "../types/coin-item";

function WatchlistPage() {
  const coins: string[] = JSON.parse(localStorage.getItem("watchlist") || "[]");
  const [myWatchlist, setMyWatchlist] = useState<CoinSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const allCoins = await getCoins();
    if (coins.length > 0 && allCoins) {
      setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading || !coins.length ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {myWatchlist.length === 0 ? (
            <div>
              <Header />
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href="/dashboard">
                  <Button text={"Dashboard"} />
                </a>
              </div>
            </div>
          ) : (
            <div style={{ height: "95vh" }}>
              <Header />
              <TabsComponent coins={myWatchlist} isWatchlistPage={true} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
