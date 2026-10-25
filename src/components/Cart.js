import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearItem, decreaseItem, increaseItem, removeItem } from "../utils/cartSlice";

const IMAGE_BASE = "https://media-assets.swiggy.com/swiggy/";

function itemAmount(item) {
  return item.price ?? item.defaultPrice ?? 0;
}

function formatRupees(amount) {
  return `₹${Math.round(amount / 100)}`;
}

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const itemCount = cartItems.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + itemAmount(item) * (item.quantity ?? 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-[1400px] px-8 py-12">
        <h1 className="mb-2 text-3xl font-bold">Your cart is empty</h1>
        <p className="mb-4 text-gray-700">Add some food from a restaurant menu.</p>
        <Link className="text-blue-600" to="/">Back to home</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cart ({itemCount})</h1>
        <button
          className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          onClick={() => dispatch(clearItem())}
        >
          Clear cart
        </button>
      </div>

      <ul>
        {cartItems.map((item, index) => (
          <li
            className="flex items-center justify-between gap-4 border-b border-gray-200 py-4"
            key={`${item.id}-${index}`}
          >
            <div className="flex items-center gap-4">
              {item.imageId ? (
                <img
                  className="h-[90px] w-[120px] rounded-lg object-cover"
                  src={`${IMAGE_BASE}${item.imageId}`}
                  alt={item.name}
                />
              ) : null}
              <div>
                <h3 className="mb-1 font-semibold">{item.name}</h3>
                <p>{formatRupees(itemAmount(item))} each</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-md border border-gray-300">
                <button
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                  type="button"
                  onClick={() => dispatch(decreaseItem(index))}
                >
                  −
                </button>
                <span className="min-w-8 text-center">{item.quantity ?? 1}</span>
                <button
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                  type="button"
                  onClick={() => dispatch(increaseItem(index))}
                >
                  +
                </button>
              </div>
              <p className="min-w-16 text-right font-semibold">
                {formatRupees(itemAmount(item) * (item.quantity ?? 1))}
              </p>
              <button
                className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-100"
                type="button"
                onClick={() => dispatch(removeItem(index))}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-2xl font-bold">Total: ₹{Math.round(totalPrice / 100)}</h2>
    </main>
  );
};

export default Cart;
