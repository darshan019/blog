//import { useState } from 'react'
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthProvider from "./components/Token";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </>
  );
};

export default App;
