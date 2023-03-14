import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ShoppingKart from "./ShoppingKart";
import Shop from "./Shop";

function App() {
  const [kartItems, setKartItems] = useState(0);

  return (
    <BrowserRouter>
      <Navbar items={kartItems} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<ShoppingKart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
