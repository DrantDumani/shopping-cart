function ShoppingKart({ itemList }) {
  return (
    <div>
      <h1>Your items</h1>
      <div className="cart-list">
        {itemList.map((item, index) => {
          return (
            <div className="item-card" key={item.id}>
              <img src={item.imgLink} alt="thumbnail" />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <label htmlFor={`${item.id}${index}`}>Quantity</label>
              <input id={`${item.id}${index}`} value={item.quantity} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShoppingKart;
