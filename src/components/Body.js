import { useState, useEffect } from "react";
import RestoCards from "./RestoCards";
import UseOnlineOfflineStatus from "./useOnlineOfflineStatus";

function Body() {
  const [ result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const isOnline = UseOnlineOfflineStatus();


  const fetchData = async () => {
    const response = await fetch("https://namastedev.com/api/v1/listRestaurants");
    const data = await response.json();
    const ResturentsData = data?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    setResult(ResturentsData);
    setFilteredResults(ResturentsData);
  }

  const newSearchClick = () => {
    const filteredResults = result.filter((resto) =>
      resto.info.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredResults(filteredResults);
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (!isOnline) {
    return (
      <div className="mx-auto max-w-[1400px] px-8 py-12">
        <h1 className="text-2xl font-bold">You are offline</h1>
        <p>Please check your internet connection.</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-8 py-4">
      <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-lg flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="min-w-0 flex-1 rounded-l-md border border-gray-300 px-3 py-3 focus:border-blue-300 focus:outline-none focus:ring"
          />
          <button className="cursor-pointer rounded-r-md bg-blue-500 px-5 py-3 font-bold text-white hover:bg-blue-700" onClick={newSearchClick} type="button">Search</button>
        </div>

        <div className="flex items-center gap-2.5">
          <label htmlFor="rating">Sort by:</label>
          <select
            id="rating"
            className="rounded-md border border-gray-300 bg-white px-3 py-3"
            onChange={(e) => {
              const { value } = e.target;
              if (value === "high") {
                const sortedResults = [...filteredResults].sort((a, b) => b.info.avgRating - a.info.avgRating);
                setFilteredResults(sortedResults);
              } else if (value === "low") {
                const sortedResults = [...filteredResults].sort((a, b) => a.info.avgRating - b.info.avgRating);
                setFilteredResults(sortedResults);
              }
            }}
          >
            <option value="high">Rating: High to Low</option>
            <option value="low">Rating: Low to High</option>
          </select>
        </div>
      </div>
      <RestoCards restoData={filteredResults} />
    </main>
  );
}

export default Body;