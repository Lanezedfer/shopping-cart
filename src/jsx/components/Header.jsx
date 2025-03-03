import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext.jsx";
import cartIcon from "../../assets/icons/cart-icon.svg";
import sidebarIcon from "../../assets/icons/sidebar-icon.svg";

function Header({ toggleSidebar }) {
  const { cart } = useContext(CartContext);
  const quantity = new Set(cart.map((item) => item.product.id)).size;
  
  return (
    <header>
      <div className="header__nav">
        <img
          src={sidebarIcon}
          alt="Sidebar toggle"
          className="header__icon"
          onClick={toggleSidebar}
        />
        <a
          href="https://github.com/Lanezedfer/shopping-cart"
          target="_blank"
          rel="noopener noreferrer"
          className="header__title"
        >
          Shopping Cart
        </a>
      </div>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__link">
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li className="header__link">
            <Link to="/store" style={{ textDecoration: "none" }}>
              Store
            </Link>
          </li>
        </ul>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <img src={cartIcon} alt="Cart" className="header__icon" />
          {quantity > 0 && <span className="header__quantity">{quantity}</span>}
        </Link>
      </nav>
    </header>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
