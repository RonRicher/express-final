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
        <NavLink to="/drive">Drive</NavLink>
        {/* <NavLink to={`users/Info`}>Info</NavLink>
        <NavLink to={`users/Todos`}>Todos</NavLink>
        <NavLink to={`users/Posts`}>Posts</NavLink>
        <NavLink to={`users/Albums`}>Albums</NavLink> */}
      </div>
      {/* {!userId && !userNum ? (
        <NavLink to="/Login">LogIn</NavLink>
      ) : (
        <NavLink onClick={logOut} id="logOutButton" to="/">
          Logout
        </NavLink>
      )} */}
    </header>
  );
}

export default NavBar;
