import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
