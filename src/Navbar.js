import { Link } from "react-router-dom";
import React from "react";

function Navbar({ itemTotal }) {
  return (
    <nav className="nav-bar">
      <ul className="nav-options">
        <li>
          <Link className="nav-link" to="/shopping-cart">
            Grizzco
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="shop">
            Shop
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="cart">
            Shopping Cart:
            <span data-testid="total-item-amount">{itemTotal}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
