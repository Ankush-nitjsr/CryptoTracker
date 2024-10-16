import { toast } from "react-toastify";

export const saveItemToWatchlist = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string
) => {
  e.preventDefault();

  const watchlist = JSON.parse(
    localStorage.getItem("watchlist") || "[]"
  ) as string[];

  if (watchlist.includes(id)) {
    toast.error(
      `${
        id.charAt(0).toUpperCase() + id.slice(1)
      } - is already added to the watchlist!`
    );
  } else {
    watchlist.push(id);
    toast.success(
      `${id.charAt(0).toUpperCase() + id.slice(1)} - added to the watchlist`
    );
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
};
