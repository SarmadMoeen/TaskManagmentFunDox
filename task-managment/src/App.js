import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import SignIn from "./screens/SignIn";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { AuthProvider } from "./ContextApi/AuthContext";
import WelcomeAnimation from "./components/welcome";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Root route to show the WelcomeAnimation */}
          <Route path="/" element={<WelcomeAnimation />} />

          {/* Other routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
