import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import SearchPokemon from "./pages/SearchPokemon.jsx";
// import SavedBooks from "./pages/SavedBooks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: Boolean,
        element: <SearchPokemon />,
      },
      // {
      //   path: "/saved",
      //   element: <SavedBooks />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
