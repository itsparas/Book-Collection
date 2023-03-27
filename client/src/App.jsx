import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";

import { AuthProvider } from "./context/Auth";
import UserHome from "./pages/book/user/Home";
import AdminHome from "./pages/book/admin/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
