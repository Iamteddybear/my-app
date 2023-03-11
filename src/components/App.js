import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import "./App.css";
import Cart from "./Cart";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/Computerparts')
      .then(res => res.json())
      .then(res => setItems(res));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    setCart(prevCart => prevCart.filter((p) => p.id !== product.id));
  };

  const location = useLocation();
  const category = location.pathname.slice(1);
  return (
    <Router>
      <div className="App">
        <Header removeFromCart={removeFromCart} />
        <Navbar cart={cart} setShowCart={setShowCart} removeFromCart={removeFromCart} />
        <Switch>
          <Route path="/Keyboards">
            <ProductList
              products={items.filter((product) => product.category === "Keyboards")}
              addToCart={addToCart}
              category={category}
            />
          </Route>
          <Route path="/Headsets">
            <ProductList
              products={items.filter((product) => product.category === "Headsets")}
              addToCart={addToCart}
              category={category}
            />
          </Route>
          <Route path="/Chairs">
            <ProductList
              products={items.filter((product) => product.category === "Chairs")}
              addToCart={addToCart}
              category={category}
            />
          </Route>
          <Route path="/Mouse">
            <ProductList
              products={items.filter((product) => product.category === "Mouse")}
              addToCart={addToCart}
              category={category}
            />
          </Route>
          <Route path="/">
            <ProductList
              products={items}
              addToCart={addToCart}
              category={category}
            />
          </Route>
        </Switch>
        {showCart && <Cart cart={cart} removeFromCart={removeFromCart} />}
      </div>
    </Router>
  );
}

export default App;
