import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons/cart-icon.svg";

function Header() {
  return (
    <header>
      <div className="header__nav">
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
          <span className="header__quantity">20</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
