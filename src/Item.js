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
    <div className="item-page">
      <h1 className="item-title" data-testid="item-name">
        {item.name}
      </h1>
      <div className="flex-img-desc">
        <p className="item-desc">{item.description}</p>
        <div className="desc-img-container">
          <img src={item.descImg} alt="description" className="desc-img" />
        </div>
      </div>
      <div className="item-info-container">
        <span className="item-price" data-testid="item-price">
          {item.price}
        </span>
        <label htmlFor="item-amount">Quantity:</label>
        <div className="input-container">
          <button className="styled-btn" onClick={decHandler}>
            -
          </button>
          <input
            className="item-input"
            id="item-amount"
            onChange={(e) => {
              changeHandler(e);
            }}
            value={item.quantity}
            maxLength="3"
          />
          <button className="styled-btn" onClick={incHandler}>
            +
          </button>
        </div>

        <div className="cart-btn-container">
          <Link
            className="link-btn cart-btn"
            to="/cart"
            onClick={() => {
              clickHandler();
            }}
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Item;
