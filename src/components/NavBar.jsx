import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <NavLink to="/" className="brand">
          <h1>Cooking Dude</h1>
        </NavLink>
        <NavLink to="/create">Create Recipe</NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
