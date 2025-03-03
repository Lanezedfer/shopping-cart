import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import CartStyles from "../../css/cart.module.css";
import deleteIcon from "../../assets/icons/delete-icon.svg";

function Cart() {
  const { cart, setCart, updateQuantity, resetCart } = useContext(CartContext);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [quantity, setQuantity] = useState(
    cart.reduce((acc, item) => {
      acc[item.product.id] = item.quantity;
      return acc;
    }, {}),
  );

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [id]: newQuantity,
      }));
      updateQuantity(id, newQuantity);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
    setQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      delete newQuantity[id];
      return newQuantity;
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setCheckoutMessage("Your cart is empty.");
      setCheckoutComplete(true);
    } else {
      resetCart();
      setCheckoutMessage("Transaction complete.");
      setCheckoutComplete(true);
    }
    setTimeout(() => {
      setCheckoutComplete(false);
      setCheckoutMessage("");
    }, 5000);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const vatAmount = totalPrice * 0.2;
  const overallPrice = totalPrice + vatAmount;

  return (
    <main>
      <div className={CartStyles.container}>
        <div>
          <h1 className="main__txt-title">Your Cart</h1>
          <div className={CartStyles.cart}>
            {cart.map((item) => (
              <div key={item.product.id} className={CartStyles.item}>
                <Link
                  to={`/product/${item.product.id}`}
                  style={{ textDecoration: "none", margin: "0 auto 1em auto" }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className={CartStyles.img}
                  />
                </Link>
                <div className={CartStyles.details}>
                  <h2 className={CartStyles.title}>{item.product.title}</h2>
                  <div className={CartStyles.quantityContainer}>
                    <button
                      className={CartStyles.btnQuantity}
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      disabled
                      className={CartStyles.input}
                      value={quantity[item.product.id]}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product.id,
                          parseInt(e.target.value),
                        )
                      }
                    />
                    <button
                      className={CartStyles.btnQuantity}
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className={CartStyles.bottom}>
                    <p className={CartStyles.itemPrice}>
                      ₱
                      {(item.product.price * quantity[item.product.id]).toFixed(
                        2,
                      )}
                    </p>
                    <img
                      src={deleteIcon}
                      alt={`Remove ${item.product.title}`}
                      className={CartStyles.icon}
                      onClick={() => removeFromCart(item.product.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={CartStyles.receipt}>
          <h2 className={CartStyles.summary}>Order Summary</h2>
          <div className={CartStyles.receiptContainer}>
            <p className={CartStyles.label}>Subtotal:</p>
            <p className={CartStyles.value}>₱{totalPrice.toFixed(2)}</p>
          </div>
          <div className={CartStyles.receiptContainer}>
            <p className={CartStyles.label}>VAT (20%):</p>
            <p className={CartStyles.value}>₱{vatAmount.toFixed(2)}</p>
          </div>
          <hr />
          <div className={CartStyles.receiptContainer}>
            <p className={CartStyles.label}>Total:</p>
            <p className={CartStyles.value}>₱{overallPrice.toFixed(2)}</p>
          </div>
          <button className={CartStyles.checkout} onClick={handleCheckout}>
            Checkout
          </button>
          {checkoutComplete && (
            <p
              className={
                checkoutMessage.includes("Transaction complete.")
                  ? CartStyles.messageSuccess
                  : CartStyles.messageFail
              }
            >
              {checkoutMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Cart;
