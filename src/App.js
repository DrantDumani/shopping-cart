import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ShoppingCart from "./ShoppingCart";
import Shop from "./Shop";
import Item from "./Item";
import Footer from "./Footer";
import images from "./images";
import "./stylesheets/App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    id: "placeholder",
    quantity: 1,
  });

  const displayCurrentItem = (id) => {
    setCurrentItem({ ...itemDB.find((item) => item.id === id), quantity: 1 });
  };

  const deleteCartItem = (item) => {
    setCartItems((cart) => {
      return cart.filter((el) => el.id !== item.id);
    });
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

  const cartChangeHandler = (event, currentItem) => {
    const { value } = event.target;
    if (value === "0") {
      deleteCartItem(currentItem);
    } else if (!/\D/g.test(value) && value.length > 0) {
      setCartItems((cart) => {
        const index = cartItems.findIndex((item) => item.id === currentItem.id);
        const updatedCart = [...cart];
        updatedCart[index] = { ...currentItem, quantity: Number(value) };
        return updatedCart;
      });
      validateCartMaxQuantity(currentItem);
    } else if (value === "") {
      deleteCartItem(currentItem);
    }
  };

  const incHandler = () => {
    setCurrentItem((curr) => {
      return { ...curr, quantity: curr.quantity + 1 };
    });
    validateMaxQuantity();
  };

  const cartIncHandler = (currentItem) => {
    setCartItems((cart) => {
      const index = cartItems.findIndex((item) => item.id === currentItem.id);
      const updatedCart = [...cart];
      updatedCart[index] = {
        ...currentItem,
        quantity: currentItem.quantity + 1,
      };
      return updatedCart;
    });
  };

  const decHandler = () => {
    setCurrentItem((curr) => {
      if (curr.quantity - 1 > 1) {
        return { ...curr, quantity: curr.quantity - 1 };
      } else return { ...curr, quantity: 1 };
    });
  };

  const cartDecHandler = (currentItem) => {
    setCartItems((cart) => {
      const index = cartItems.findIndex((item) => item.id === currentItem.id);
      const updatedCart = [...cart];
      if (cart[index].quantity - 1 > 0) {
        updatedCart[index] = {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        };
      } else {
        deleteCartItem(currentItem);
      }
      return updatedCart;
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

  const validateCartMaxQuantity = (currentItem) => {
    setCartItems((cart) => {
      const index = cartItems.findIndex((item) => item.id === currentItem.id);
      if (cart[index].quantity > 999) {
        const updatedCart = [...cart];
        updatedCart[index] = { ...currentItem, quantity: 999 };
        return updatedCart;
      }
      return cart;
    });
  };

  const addToKart = () => {
    const inCart = cartItems.findIndex((item) => item.id === currentItem.id);
    if (inCart !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[inCart].quantity += currentItem.quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems((currentCart) => {
        return [...currentCart, currentItem];
      });
    }
  };

  const itemDB = [
    {
      name: "Crab Tank",
      price: 2100,
      imgLink: images.crabTank,
      descImg: images.descCrabTank,
      description:
        "The latest in cutting edge crustacean technology. The crab tank comes equipped with long ranged turrets and air cooled bomb launchers. The perfect option for stopping invaders.",
      id: "CrabTank",
    },
    {
      name: "Reef Slider",
      price: 2600,
      imgLink: images.reefSlider,
      descImg: images.descReefSlider,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      id: "Reef Slider",
    },
    {
      name: "Inkjet",
      price: 2200,
      imgLink: images.inkjet,
      descImg: images.descInkjet,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      id: "Inkjet",
    },
    {
      name: "Trizooka",
      price: 3333,
      imgLink: images.trizooka,
      descImg: images.descTrizooka,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      id: "Trizooka",
    },
    {
      name: "Wave Breaker",
      price: 1900,
      imgLink: images.waveBreaker,
      descImg: images.descWaveBreaker,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      id: "WaveBreaker",
    },
    {
      name: "Triple Inkstrike",
      price: 1900,
      imgLink: images.inkstrike,
      descImg: images.descInkstrike,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      id: "Inkstrike",
    },
  ];

  return (
    <>
      <Navbar itemTotal={cartItems.reduce((acc, el) => acc + el.quantity, 0)} />
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
        <Route
          path="/cart"
          element={
            <ShoppingCart
              itemList={cartItems}
              changeHandler={cartChangeHandler}
              incHandler={cartIncHandler}
              decHandler={cartDecHandler}
              removeItem={deleteCartItem}
              subTotal={cartItems.reduce(
                (acc, el) => acc + el.price * el.quantity,
                0
              )}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
