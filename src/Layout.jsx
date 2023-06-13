/* This is the main App component of a React application. It imports various components and pages, sets
up routes using the `react-router-dom` library, and renders the appropriate components based on the
current route. It also initializes the `Aos` library for animating page transitions and uses the
`useGlobalContext` hook to access global state. Finally, it renders a `ToastContainer` component
from the `react-toastify` library for displaying notifications. */
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
import Reminder from "./pages/Reminder";
import Articles from "./pages/resources";
import GastricUlcer from "./pages/resources/GastricUlcer";
import DiagnoseUlcer from "./pages/resources/DiagnoseUlcer";
import LifeModifications from "./pages/resources/LifeModifications";
import Error404 from "./pages/Error404";

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

        {/* The `<Routes>` component is defining the routes for the application. The first `<Route>`
          element is defining the path for the home page ("/") and rendering the `<Home>` component
          when the path matches. The second `<Route>` element is defining a private route and
          rendering the `<PrivateRoutes>` which will render only if user is authenticated or logged in.  */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="resources" element={<Articles />}>
            <Route path="gastric-ulcer-101" element={<GastricUlcer />} />
            <Route path="life-modifications" element={<LifeModifications />} />
            <Route
              path="how-gastric-ulcer-is-diagnosed"
              element={<DiagnoseUlcer />}
            />
          </Route>
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
            <Route path="/reminder" element={<Reminder />} />
          </Route>

          {/* error page */}
          <Route path="*" element={<Error404 />} />
        </Routes>
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
