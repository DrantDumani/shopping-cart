import React from "react";
import { Link } from "react-router-dom";

function Shop({ db }) {
  const items = db.map((item) => {
    return (
      <div key={item.id}>
        <Link to={item.id} aria-label="item-link">
          <img src={item.imgLink} alt="thumbnail" />
          <p>{item.name}</p>
          <p>{item.price}</p>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <h1>Spend money</h1>
      <div>{items}</div>
    </div>
  );
}

export default Shop;
