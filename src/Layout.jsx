import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Aos from "aos";
import { useEffect } from "react";

import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1000,
    });
  }, []);

  return (
    <>
      <Router>
        <Navbar />

        <main>
          {/* The `<Routes>` component is defining the routes for the application. The first `<Route>`
          element is defining the path for the home page ("/") and rendering the `<Home>` component
          when the path matches. The second `<Route>` element is defining a private route and
          rendering the `<PrivateRoutes>` which will render only if user is authenticated or logged in.  */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route element={<PrivateRoutes />}></Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
