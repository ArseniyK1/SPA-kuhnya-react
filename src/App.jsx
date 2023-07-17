import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const closeCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <CartContextProvider>
      {cartIsVisible && <Cart onHideCart={closeCartHandler} />}
      <Header onShowModal={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
