import React from "react";
import { Link } from "react-router-dom";

function Shop({ db }) {
  const items = db.map((item) => {
    return (
      <div key={item.id}>
        <Link to={item.id} aria-label="item-link" className="item-card">
          <div className="img-container">
            <img src={item.imgLink} alt="thumbnail" className="thumbnail" />
          </div>
          <span className="item-name">{item.name}</span>
          <span className="item-price">{item.price}</span>
        </Link>
      </div>
    );
  });

  return (
    <div className="shopPage">
      <h1>Spend money</h1>
      <div className="item-grid-container">{items}</div>
    </div>
  );
}

export default Shop;
