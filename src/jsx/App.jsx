import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Store from "./pages/Store.jsx";

function App() {
  return (
    <div className="grid-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/store" element={<Store />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
