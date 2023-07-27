import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
 
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      
      <Link to="/admin"  style={{ margin: "0 50px" }}>Admin </Link>
     
    </div>
  );
};

export default NavBar 