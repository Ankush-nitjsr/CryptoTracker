import { toast } from "react-toastify";

export const removeItemFromWatchlist = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string,
  setIsCoinAdded: (value: boolean) => void
) => {
  e.preventDefault();

  if (window.confirm("Are you sure you want to remove this coin?")) {
    const watchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    ) as string[];

    const newList = watchlist.filter((coin) => coin !== id);
    setIsCoinAdded(false);
    localStorage.setItem("watchlist", JSON.stringify(newList));

    toast.success(
      `${id.charAt(0).toUpperCase() + id.slice(1)} - has been removed!`
    );

    window.location.reload();
  } else {
    toast.error(
      `${id.charAt(0).toUpperCase() + id.slice(1)} - could not be removed!`
    );
    setIsCoinAdded(true);
  }
};
