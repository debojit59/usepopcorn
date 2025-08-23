import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import StarRating from "./assets/StarRating";

createRoot(document.getElementById("root")).render(
  <StrictMode>{<App />}</StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     {/* <App /> */}
//     <StarRating maxRating={5} className="test" />
//   </StrictMode>
// );
