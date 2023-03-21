import { Link } from "react-router-dom";
import React from "react";

function Navbar({ itemTotal }) {
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
          <Link to="cart">
            Shopping Cart:
            <span data-testid="total-item-amount">{itemTotal}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
