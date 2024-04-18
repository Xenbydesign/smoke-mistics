import { createRoot } from "react-dom/client";
import router from "./utilities/routes.jsx";

import "./index.css"
import { RouterProvider } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

console.log("🚀 ~ router:", router)
root.render(
    // <StrictMode>
    <RouterProvider router={router} />
    // </StrictMode>
);