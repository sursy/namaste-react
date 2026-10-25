const dummyimage = new URL("../assets/Placeholder.jpeg", import.meta.url);
import { Link } from "react-router-dom";

const RestoCards = ({ restoData }) => {
  return (
    restoData.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {restoData.map((resto) => (
            <Link to={`/restaurant/${resto.info.id}`} key={resto.info.id} className="block relative hover:shadow-lg hover:scale-105 hover:ring-2 hover:ring-blue-500 border border-gray-200 bg-gray-50 p-2.5">
              <img className="h-[300px] w-full rounded-md object-contain" src={resto.info.cloudinaryImageId ? `https://media-assets.swiggy.com/swiggy/${resto.info.cloudinaryImageId}` : dummyimage.href} alt={resto.info.name} />
              {resto.info.veg && (
                <span className="bg-green-500 text-white px-2 py-1 text-sm font-bold absolute top-2 left-2">Veg</span>
              )}
              <h3 className="mt-2 text-lg font-semibold">{resto.info.name}</h3>
              <p>Price: {resto.info.costForTwo}</p>
              <p className="font-bold text-amber-600">⭐ {resto.info.avgRating}</p>
            </Link>
        ))}
        </div>
    ) : (
        <p>No restaurants found.</p>
    )
  );
}

export default RestoCards;
