import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Product from "./pages/Product.jsx";
import Store from "./pages/Store.jsx";
import CartProvider from "./provider/CartProvider.jsx";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    JSON.parse(localStorage.getItem("isSidebarVisible")) ?? true,
  );

  useEffect(() => {
    localStorage.setItem("isSidebarVisible", JSON.stringify(isSidebarVisible));
  }, [isSidebarVisible]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="grid-container">
      <CartProvider>
        <Header toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route
            path="/store"
            element={<Store isSidebarVisible={isSidebarVisible} />}
          ></Route>
        </Routes>
      </CartProvider>
      <Footer />
    </div>
  );
}

export default App;
