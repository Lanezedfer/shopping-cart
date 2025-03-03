import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import DefaultStyles from "../../css/default.module.css";
import ProductStyles from "../../css/product.module.css";
import ratingIcon from "../../assets/icons/rating-icon.svg";
import returnIcon from "../../assets/icons/return-icon.svg";

function Product() {
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addToCartMessage, setAddToCartMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    const cartItem = cart.find((item) => item.product.id === parseInt(id));
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, id]);

  if (!product) {
    return (
      <div className="grid-container">
        <main>
          <div className={DefaultStyles.app}>
            <p className={DefaultStyles.description}>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    if (cartItem) {
      const remainingQuantity = 10 - cartItem.quantity;
      if (remainingQuantity <= 0) {
        setAddToCartMessage("Cannot add more of this item to the cart.");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
        return;
      }
      const quantityToAdd = Math.min(quantity, remainingQuantity);
      addToCart(product, quantityToAdd);
      setAddToCartMessage(`Added ${quantityToAdd} of this item to the cart.`);
      setShowMessage(true);
    } else {
      addToCart(product, Math.min(quantity, 10));
      setAddToCartMessage(
        `Added ${Math.min(quantity, 10)} of this item to the cart.`,
      );
      setShowMessage(true);
    }
    setTimeout(() => setShowMessage(false), 5000);
  };

  return (
    <main>
      <Link
        to="/store"
        className={ProductStyles.return}
        style={{ textDecoration: "none" }}
      >
        <img
          src={returnIcon}
          alt="Return to store"
          className={ProductStyles.iconReturn}
        />
      </Link>
      <div className={ProductStyles.product}>
        <img
          src={product.image}
          alt={product.title}
          className={ProductStyles.img}
        />
        <div>
          <h1 className={ProductStyles.title}>{product.title}</h1>
          <p className={ProductStyles.description}>{product.description}</p>
          <div className={ProductStyles.rating}>
            <img
              src={ratingIcon}
              alt={`${product.title} rating`}
              className={ProductStyles.iconRating}
            />
            <p className={ProductStyles.score}>
              {product.rating.rate} ({product.rating.count})
            </p>
          </div>
          <p className={ProductStyles.price}>₱{product.price}</p>
          <div className={ProductStyles.container}>
            <button
              className={ProductStyles.btnQuantity}
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="10"
              disabled
              className={ProductStyles.input}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button
              className={ProductStyles.btnQuantity}
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
          <button className={ProductStyles.btnSubmit} onClick={handleAddToCart}>
            Add to Cart
          </button>
          {showMessage && (
            <p
              className={
                addToCartMessage.includes(
                  "Cannot add more of this item to the cart.",
                )
                  ? ProductStyles.messageFail
                  : ProductStyles.messageSuccess
              }
            >
              {addToCartMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Product;
