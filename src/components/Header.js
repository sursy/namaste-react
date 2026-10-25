const logo = new URL("../assets/logo.png", import.meta.url);
import { Link } from "react-router-dom";
import UseOnlineStatus from "./useOnlineOfflineStatus";
import { useContext, useState } from "react";
import userContext from "./UserContext";
import { useSelector } from "react-redux";


function Header() {

  const onlineStatus = UseOnlineStatus();

  const { user } = useContext(userContext);
  const [loggedIn, setLoggedIn] = useState(true);

  const cart = useSelector((store) => store.cart.items);
  const cartCount = cart.reduce((total, item) => total + (item.quantity ?? 1), 0);

  return (
    <header>
     <div className="flex justify-between items-center p-5 pl-12 pr-12 bg-gray-800 text-white">
        <div>
            <img className="h-auto w-[140px]" src={logo.href} alt="Company Logo" />
        </div>

        <nav className="flex space-x-4 justify-center items-center">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">Cart ({cartCount} items)</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/online-status">Online Status {onlineStatus ? "Online" : "Offline"}</Link>
            <Link to="/login">{loggedIn ? `Login User: ${user}` : "Login User: Guest"}</Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              type="button"
              onClick={() => setLoggedIn((current) => !current)}
            >
              {loggedIn ? "Logout" : "Login"}
            </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
