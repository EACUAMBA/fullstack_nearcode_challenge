import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ margin: "3rem", padding: '1rem', border: "1px solid black" }}>
      <nav style={{ display: "flex", gap: ".5rem" }}>
        <Link to={"/carros"}>Carros</Link>
        <Link to={"/utilizadores"}>Utilizadores</Link>
        <Link to={"/"}>Sair</Link>
      </nav>
    </header>
  );
};

export default Header;
