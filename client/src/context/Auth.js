import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../axios";
import { getCookie } from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = async (userData) => {
    let message = {};
    await axiosInstance
      .post("/user/login", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data.email);
        setRole(res.data.role);
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", res.data.email);
        message = { message: res.data.message, role: res.data.role };
      })
      .catch((e) => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.setItem("isAuthenticated", "false");
        message = { message: e.response.data.message, role: "" };
      });

    return message;
  };

  const logout = () => {
    document.cookie = "token=; path=/;";
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.setItem("isAuthenticated", "false");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};
