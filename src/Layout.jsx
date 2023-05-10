import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Tracker from "./pages/Tracker";
import { useGlobalContext } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Onboarding from "./pages/Onboarding";

function App() {
  const { visited } = useGlobalContext();

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

        <>
          {/* The `<Routes>` component is defining the routes for the application. The first `<Route>`
          element is defining the path for the home page ("/") and rendering the `<Home>` component
          when the path matches. The second `<Route>` element is defining a private route and
          rendering the `<PrivateRoutes>` which will render only if user is authenticated or logged in.  */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              element={
                <ProtectedRoute
                  redirectPath={visited ? "/dashboard" : "/login"}
                />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/onboarding" element={<Onboarding />} />
            </Route>
            <Route element={<ProtectedRoute redirectPath="/login" />}>
              <Route path="tracker" element={<Tracker />} />
            </Route>
          </Routes>
        </>
      </Router>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
