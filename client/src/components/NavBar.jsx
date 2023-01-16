import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


function NavBar() {


  return (
    <header id="navBar">
      <div>
        <NavLink to="/Login">LogIn</NavLink>
        <NavLink to="/SignUp">SignUp</NavLink>
        <NavLink to="/drive">Drive</NavLink>
      </div>
    </header>
  );
}

export default NavBar;
