function ShoppingCart({
  itemList,
  changeHandler,
  incHandler,
  decHandler,
  removeItem,
  subTotal,
}) {
  return subTotal === 0 ? (
    <div className="empty-cart">
      <h1 className="empty-cart-text">
        Your cart is empty! Visit the shop and view our products!
      </h1>
    </div>
  ) : (
    <div className="cart-page">
      <h1>Your items</h1>
      <div className="cart-list">
        {itemList.map((item, index) => {
          return (
            <div className="item-card" key={item.id}>
              <div className="kart-img-div">
                <img className="thumbnail" src={item.imgLink} alt="thumbnail" />
              </div>
              <div className="cart-card-div">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price}</span>
                <label htmlFor={`${item.id}${index}`}>Quantity</label>
                <div className="cart-input-container">
                  <button
                    className="styled-btn"
                    onClick={() => {
                      decHandler(item);
                    }}
                  >
                    -
                  </button>
                  <input
                    className="item-input"
                    id={`${item.id}${index}`}
                    value={item.quantity}
                    onChange={(e) => {
                      changeHandler(e, item);
                    }}
                    maxLength="3"
                  />
                  <button
                    className="styled-btn"
                    onClick={() => {
                      incHandler(item);
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="styled-btn del-btn"
                  onClick={() => removeItem(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sub-total-container">
        <span className="sub-total">
          Subtotal: <span data-testid="sub-total">{subTotal}</span>
          <div className="checkout-btn-container">
            <button className="checkout-btn styled-btn">Checkout</button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default ShoppingCart;
