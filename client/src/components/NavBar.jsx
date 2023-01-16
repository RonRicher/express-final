import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { useUser } from "../context/UserContext";
// import { deleteCookie, getCookie } from "../js/cookie";

function NavBar() {
//   const [userId, setUserId] = useState("");
//   const {setUserNum, userNum} = useUser();


//   useEffect(() => {
//     setUserId(getCookie("userId"));
//   });

//   function logOut() {
//     deleteCookie("userId");
//     setUserNum("");
//   }

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
