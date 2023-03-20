import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ShoppingKart from "./ShoppingKart";
import Shop from "./Shop";
import Item from "./Item";

function App() {
  const [itemAmount, setItemAMount] = useState(0);

  return (
    <>
      <Navbar items={itemAmount} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:itemId" element={<Item />} />
        <Route path="/cart" element={<ShoppingKart />} />
      </Routes>
    </>
  );
}

export default App;
