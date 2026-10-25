import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const dummyimage = new URL("../assets/Placeholder.jpeg", import.meta.url);
const IMAGE_BASE = "https://media-assets.swiggy.com/swiggy/";

function findRestaurantInfo(json) {
  const cards = json?.data?.cards || [];
  for (const card of cards) {
    const info = card?.card?.card?.info;
    if (info?.name) return info;
  }
  return null;
}

function findMenuCards(json) {
  const cards = json?.data?.cards || [];
  for (const card of cards) {
    const regular = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    if (Array.isArray(regular)) return regular;
  }
  return [];
}

function getItemCards(categoryCard) {
  const card = categoryCard?.card?.card;
  if (!card) return [];
  if (Array.isArray(card.itemCards)) return card.itemCards;
  if (Array.isArray(card.categories)) {
    return card.categories.flatMap((category) => category.itemCards || []);
  }
  return [];
}

function formatPrice(item) {
  const amount = item.price ?? item.defaultPrice;
  if (amount == null) return "";
  return `₹${Math.round(amount / 100)}`;
}

function RestoDetail() {
  const { resId } = useParams();
  const [info, setInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [showItems, setShowItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let ignore = false;

    async function fetchRestoDetails() { 
      setStatus("loading");
      try {
        const response = await fetch(
          `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`
        );
        const json = await response.json();
        if (ignore) return;

        const nextInfo = findRestaurantInfo(json);
        const nextCategories = findMenuCards(json).filter(
          (category) => getItemCards(category).length > 0
        );
        setInfo(nextInfo);
        setCategories(nextCategories);
        setStatus(nextInfo ? "ready" : "empty");
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    fetchRestoDetails();
    return () => {
      ignore = true;
    };
  }, [resId]);

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-[1400px] px-8 py-6">
        <p>Loading restaurant...</p>
      </main>
    );
  }

  if (status === "error" || !info) {
    return (
      <main className="mx-auto max-w-[1400px] px-8 py-6">
        <h1 className="mb-2 text-2xl font-bold">Restaurant unavailable</h1>
        <p>The menu could not be loaded.</p>
      </main>
    );
  }

  const imageSrc = info.cloudinaryImageId
    ? `${IMAGE_BASE}${info.cloudinaryImageId}`
    : dummyimage.href;


  const handleCategoryClick = (id) => {
    setShowItems((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  }

  return (
    <main className="mx-auto max-w-[1400px] px-8 py-6 pb-12">
      <section className="mb-8 flex items-center gap-6">
        <img className="h-40 w-[220px] rounded-lg object-cover" src={imageSrc} alt={info.name} />
        <div>
          <h1 className="mb-2 text-3xl font-bold">{info.name}</h1>
          <p className="mb-1.5 font-bold text-amber-600">⭐ {info.avgRating || "—"} {info.totalRatingsString ? `(${info.totalRatingsString})` : ""}</p>
          <p className="mb-1.5">{info.cuisines?.join(", ")}</p>
          <p className="mb-1.5">{info.areaName}{info.sla?.slaString ? ` · ${info.sla.slaString}` : ""}</p>
          <p>{info.costForTwoMessage || info.costForTwo}</p>
        </div>
      </section>

      {categories.map((category) => {
        const card = category.card.card;
        const items = getItemCards(category);
        return (
          <section className="mb-7" key={card.title}>
            <h2 id={card.title} onClick={() => handleCategoryClick(card.title)} className="mb-3 cursor-pointer px-2 py-2 bg-amber-100 text-lg font-semibold">{card.title} ({items.length})</h2>
            {showItems.includes(card.title) && (
            <ul id={card.title}>
              {items.map((entry) => {
                const item = entry.card.info;
                return (
                  <li className="flex relative items-start justify-between gap-4 border-b border-gray-200 py-4" key={item.id}>
                    <div>
                      <h3 className="mb-1.5 font-semibold">{item.name}</h3>
                      <p className="mb-1.5">{formatPrice(item)}</p>
                      {item.description ? <p className="text-gray-700">{item.description}</p> : null}
                    </div>
                    {item.imageId ? (
                      <img className="h-[90px] w-[120px] rounded-lg object-cover" src={`${IMAGE_BASE}${item.imageId}`} alt={item.name} />
                    ) : null}
                    <button onClick={() => handleAddItem(item)} id={item.id} className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-700 absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer">Add Cart</button>
                  </li>
                );
              })}
            </ul>
            )}
          </section>
        );
      })}
    </main>
  );
}

export default RestoDetail;
