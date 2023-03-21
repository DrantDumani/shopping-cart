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
  const [currentItem, setCurrentItem] = useState({
    id: "placeholder",
    quantity: 1,
  });

  const displayCurrentItem = (id) => {
    setCurrentItem({ ...itemDB.find((item) => item.id === id), quantity: 1 });
  };

  const changeHandler = (event) => {
    const { value } = event.target;
    if (!/\D/g.test(value) && value.length > 0) {
      setCurrentItem((curr) => {
        return { ...curr, quantity: Number(value) };
      });
      validateMaxQuantity();
    } else if (value === "") {
      setCurrentItem((curr) => {
        return { ...curr, quantity: 1 };
      });
    }
  };

  const incHandler = () => {
    setCurrentItem((curr) => {
      return { ...curr, quantity: curr.quantity + 1 };
    });
    validateMaxQuantity();
  };

  const decHandler = (limit) => {
    setCurrentItem((curr) => {
      if (curr.quantity - 1 > limit) {
        return { ...curr, quantity: curr.quantity - 1 };
      } else return { ...curr, quantity: 1 };
    });
  };

  const validateMaxQuantity = () => {
    setCurrentItem((curr) => {
      if (curr.quantity > 999) {
        return { ...curr, quantity: 999 };
      }
      return curr;
    });
  };

  const addToKart = () => {
    // if the item is already in the kart, increase its quantity by the quantity instead
    const inCart = cartItems.findIndex((item) => item.id === currentItem.id);
    if (inCart !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[inCart].quantity += currentItem.quantity;
      setCartItems(updatedCart);
    } else {
      // const pushToKart = { ...itemObj, quantity: num };
      setCartItems((currentCart) => {
        return [...currentCart, currentItem];
      });
      console.log(cartItems);
    }
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
          element={
            <Item
              onMount={displayCurrentItem}
              clickHandler={addToKart}
              changeHandler={changeHandler}
              incHandler={incHandler}
              decHandler={decHandler}
              item={currentItem}
            />
          }
        />
        <Route path="/cart" element={<ShoppingKart itemList={cartItems} />} />
      </Routes>
    </>
  );
}

export default App;
