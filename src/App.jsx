import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserNav from "./components/layout/nav/UserNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RouteNotFound from "./pages/RouteNotFound";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VenuePage from "./pages/VenuePage";
import Avatar from "./pages/Avatar";
import MyBookings from "./pages/MyBookings";
import MyVenue from "./pages/MyVenue";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="avatar" element={<Avatar />} />
          <Route path="mybookings" element={<MyBookings />} />
          <Route path="myvenue" element={<MyVenue />} />

          <Route path="venue/:id" element={<VenuePage />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
