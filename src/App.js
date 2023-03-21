import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ShoppingKart from "./ShoppingKart";
import Shop from "./Shop";
import Item from "./Item";
import images from "./images";

function App() {
  const [cartTotal, setcartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    id: "placeholder",
    quantity: 1,
  });

  // useEffect(() => {
  //   setcartTotal(cartItems.reduce((acc, el) => acc + el.quantity));
  // }, [cartItems]);

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
      // setCartItems((cart) => {
      deleteCartItem(currentItem);
      // const index = cartItems.findIndex((item) => item.id === currentItem.id);
      // const updatedCart = [...cart];
      // updatedCart[index] = { ...currentItem, quantity: 0 };
      // return updatedCart;
      // });
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
        // updatedCart[index] = { ...currentItem, quantity: 0 };
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
      description: "Lorem Ipsum",
      id: "CrabTank",
    },
    {
      name: "Wave Breaker",
      price: 1900,
      imgLink: images.waveBreaker,
      descImg: images.descWaveBreaker,
      description: "Lorem Ipsum",
      id: "WaveBreaker",
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
            <ShoppingKart
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
    </>
  );
}

export default App;
