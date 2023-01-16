import React, { useState } from 'react';
import Login from "./components/LogIn";
import NavBar from "./components/NavBar";
import '../src/signIn.css';
import Home from './components/Home';
import Drive from './components/Drive';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';


function App() {

    const userId = localStorage.getItem('userId')
  return (
    <>
      {userId ?
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Drive" element={<Drive />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>

        :
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      }
    </>
  );
}

export default App;
