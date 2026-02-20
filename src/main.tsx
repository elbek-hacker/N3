import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TokenContext } from "./context/Context";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TokenContext>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </TokenContext>
  </BrowserRouter>
);
