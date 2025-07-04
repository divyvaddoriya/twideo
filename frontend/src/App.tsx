import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Register from "./page/RegisterPage";
import Authenticated from "./page/Authenticated";
import { useAuth } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import Login from "./page/LoginPage";
import Sidebar from "./components/ui/Sidebar";
import Header from "./components/ui/Header";
import Profile from "./page/Profile";

function App() {

    const { isAuthenticated} = useAuth();
  

  return  (
<>
   <Router>
      <Routes>
        {/* Auth Routes */}
    {  !isAuthenticated && 
        <Route path="/login" element={<Login />} />
    }
      {  isAuthenticated && 
      <Route path="/" element={<Register />} />
      }
        </Routes>
        {/* Main App Routes */}
{  ! isAuthenticated &&  (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 ml-64 pt-20">
                <Routes>
                  <Route path="/" element={<Authenticated />} />
                  {/* <Route path="/watch/:id" element={<VideoPlayer />} />
                  <Route path="/channel/:id" element={<Channel />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/playlist/:id" element={<Playlist />} />
                  <Route path="/history" element={<History />} /> */}
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </div>)}
        
    </Router>
         <ToastContainer position="top-right" autoClose={3000} theme="dark" />
</>
  )
}

export default App;
