import { Routes, Route } from "react-router-dom";

//Import all pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import NotFound from "./pages/NotFound";
import Zustand from "./pages/Zustand";

//Import utils
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/zustand" element={<Zustand />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
