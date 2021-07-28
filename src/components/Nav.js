import React from "react";
import { useLocation } from "react-router-dom";
import { NavList, LinkStyled } from "./Navs.styled.js";
const Nav = () => {
  const location = useLocation();
  const LINKS = [
    { to: "/", text: "Home" },
    { to: "/starred", text: "Starred" },
  ];
  return (
    <nav>
      <NavList>
        {LINKS.map((link) => (
          <li key={link.to}>
            <LinkStyled
              to={link.to}
              className={link.to === location.pathname ? "active" : ""}
            >
              {link.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </nav>
  );
};
export default Nav;
