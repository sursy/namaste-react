import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import AboutUs from "./src/components/AboutUs";
import ContactUs from "./src/components/ContactUs";
import Cart from "./src/components/Cart";
import RestoDetail from "./src/components/RestoDetail";
import userContext from "./src/components/UserContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from "./src/utils/appStore";
import "./index.css";


function AppLayout() {
  const loggedInUser = "Suresh Kumar";

  return (
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
    <userContext.Provider value={{ user: loggedInUser }}>
    <div className="app">
      <Header />
      <Outlet />
    </div>
    </userContext.Provider>
    </PersistGate>
    </Provider>
  );
}

const ErrorPage = lazy(() => import("./src/components/ErrorPage"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Suspense fallback={<h2>loading</h2>}><ErrorPage /></Suspense>,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "restaurant/:resId",
        element: <RestoDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
