import React from "react";
import { Link, useParams } from "react-router-dom";

function Item({ clickHandler, changeHandler, incHandler, decHandler }) {
  const { itemId } = useParams();
  return (
    <div>
      <label htmlFor="item-amount">Quantity:</label>
      <input type="number" id="item-amount" onChange={changeHandler} />
      <button onClick={incHandler}>+</button>
      <button onClick={decHandler}>-</button>
      <Link to="/cart" onClick={clickHandler}>
        Add to Cart
      </Link>
    </div>
  );
}

export default Item;
