import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./components/LogIn";
import NavBar from "./components/NavBar";
import '../src/signIn.css';
import Home from './components/Home';
import Drive from './components/Drive';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Drive" element={<Drive />} />
        <Route path="/LogIn" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
