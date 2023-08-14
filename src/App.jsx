import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import PreLoader from "./components/PreLoader/PreLoader";
import router from "./components/Routes/Routes";

function App() {
  return (
    <>
      <PreLoader />
      <Toaster />
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
