import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./context/authContext.jsx";

import ChartContextProvider from "./context/chartContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <AuthContextProvider>
    <ChartContextProvider>
      <App />
    </ChartContextProvider>
  </AuthContextProvider>

  // </React.StrictMode>,
);
