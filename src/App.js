import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ShoppingKart from "./ShoppingKart";
import Shop from "./Shop";
import Item from "./Item";
import images from "./images";

function App() {
  const [itemAmount, setItemAMount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToKart = (num, itemObj) => {
    // if the item is already in the kart, increase its quantity by the quantity instead
    const inCart = cartItems.findIndex((item) => item.id === itemObj.id);
    if (inCart !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[inCart].quantity += num;
      return;
    }
    const pushToKart = { ...itemObj, quantity: num };
    setCartItems((currentCart) => {
      return [...currentCart, pushToKart];
    });
    console.log(cartItems);
  };

  const itemDB = [
    {
      name: "Crab Tank",
      price: 21000,
      imgLink: images.crabTank,
      descImg: images.descCrabTank,
      description: "Lorem Ipsum",
      id: "CrabTank",
    },
  ];

  return (
    <>
      <Navbar items={itemAmount} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop db={itemDB} />} />
        <Route
          path="/shop/:itemId"
          element={<Item db={itemDB} clickHandler={addToKart} />}
        />
        <Route path="/cart" element={<ShoppingKart itemList={cartItems} />} />
      </Routes>
    </>
  );
}

export default App;
