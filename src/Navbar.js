import { Link } from "react-router-dom";
import React from "react";

function Navbar({ items }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Grizzco</Link>
        </li>
        <li>
          <Link to="shop">Shop</Link>
        </li>
        <li>
          <Link to="cart">Shopping Cart: {items}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
