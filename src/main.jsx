import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./errorPage.jsx";
import Home from "./routes/Home/Home.jsx";
import MensClothing from "./routes/MensClothing/MensClothing.jsx";
import WomensClothing from "./routes/WomensClothing/WomensClothing.jsx";
import Jewelery from "./routes/Jewelery/Jewelery.jsx";
import Electronics from "./routes/Electronics/Electronics.jsx";
import Cart from "./routes/Cart/Cart.jsx";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            index: true,
            element: <Home></Home>,
          },
          {
            path: "mens",
            element: <MensClothing></MensClothing>,
          },
          {
            path: "womens",
            element: <WomensClothing></WomensClothing>,
          },
          {
            path: "jewelery",
            element: <Jewelery></Jewelery>,
          },
          {
            path: "electronics",
            element: <Electronics></Electronics>,
          },
          {
            path: "cart",
            element: <Cart></Cart>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
