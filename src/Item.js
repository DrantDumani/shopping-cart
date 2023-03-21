import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Item({
  clickHandler,
  onMount,
  changeHandler,
  incHandler,
  decHandler,
  item,
}) {
  const { itemId } = useParams();
  useEffect(() => {
    onMount(itemId);
  }, []);

  return (
    <div>
      <img src={item.descImg} alt="description" />
      <p>{item.desc}</p>
      <p data-testid="item-name">{item.name}</p>
      <p data-testid="item-price">{item.price}</p>
      <label htmlFor="item-amount">Quantity:</label>
      <input
        id="item-amount"
        onChange={(e) => {
          changeHandler(e);
        }}
        value={item.quantity}
        maxLength="3"
      />
      <button onClick={incHandler}>+</button>
      <button onClick={decHandler}>-</button>
      <Link
        to="/cart"
        onClick={() => {
          clickHandler();
        }}
      >
        Add to Cart
      </Link>
    </div>
  );
}

export default Item;
