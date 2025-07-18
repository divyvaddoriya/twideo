import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

axios.defaults.withCredentials = true; // Send cookies with every request
const AuthContext = createContext({user: null , isAuthenticated: false,  loading: true});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // user data
  const [loading, setLoading] = useState(true); // to track auth check on load
  const [isAuthenticated , setIsAuthenticated ] = useState(false); // to track auth check on load

  console.log(isAuthenticated);
  
  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me" ,{
          withCredentials: true,
        });
        // console.log(res);
        setIsAuthenticated(res.data.success);
        setUser(res.data.data);
        toast.success(`Welcome back, ${res.data.data.name || "User"}!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser , setIsAuthenticated , loading , isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
