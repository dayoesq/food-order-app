import React, { useState } from 'react';

import Meals from './components/Meals/Meals';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const closeCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      { showCart && <Cart onClose={closeCartHandler} onClick={closeCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
