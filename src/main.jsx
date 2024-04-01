import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <ProductContextProvider>
  //   <App />
  // </ProductContextProvider>

  <SnackbarProvider
    autoHideDuration={5000}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </SnackbarProvider>

  // </React.StrictMode>,
);
