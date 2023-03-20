import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//show the price, name, descImg, and desc of the item that was used to link here.

function Item({ clickHandler, db }) {
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState({
    name: "",
    price: "",
    desc: "",
    descImg: "",
  });
  const [itemAmount, setItemAmount] = useState(1);

  const validateMaxQuantity = () => {
    setItemAmount((curr) => {
      if (curr > 999) {
        return 999;
      }
      return curr;
    });
  };

  const changeHandler = (event) => {
    const { value } = event.target;
    if (!/\D/g.test(value) && value.length > 0) {
      setItemAmount(Number(value));
      validateMaxQuantity();
    } else if (value === "") {
      setItemAmount(1);
    }
  };

  const incHandler = () => {
    setItemAmount((curr) => curr + 1);
    validateMaxQuantity();
  };

  const decHandler = () => {
    setItemAmount((curr) => {
      if (curr - 1 > 0) {
        return curr - 1;
      } else return 1;
    });
  };

  useEffect(() => {
    for (let item of db) {
      if (item.id === itemId) {
        setCurrentItem(item);
        return;
      }
    }
  }, []);

  return (
    <div>
      <img src={currentItem.descImg} alt="description" />
      <p>{currentItem.desc}</p>
      <p data-testid="item-name">{currentItem.name}</p>
      <p data-testid="item-price">{currentItem.price}</p>
      <label htmlFor="item-amount">Quantity:</label>
      <input
        id="item-amount"
        onChange={(e) => {
          changeHandler(e);
        }}
        value={itemAmount}
        maxLength="3"
      />
      <button onClick={incHandler}>+</button>
      <button onClick={decHandler}>-</button>
      <Link
        to="/cart"
        onClick={() => {
          clickHandler(itemAmount, currentItem);
        }}
      >
        Add to Cart
      </Link>
    </div>
  );
}

export default Item;
