import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DefaultStyles from "../../css/default.module.css";
import ProductStyles from "../../css/product.module.css";
import ratingIcon from "../../assets/icons/rating-icon.svg";
import returnIcon from "../../assets/icons/return-icon.svg";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .catch((error) => console.error(error));
  }, [id]);

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

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity >= 10) return prevQuantity;
      return prevQuantity + 1;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 1) return prevQuantity;
      return prevQuantity - 1;
    });
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
              onClick={decrementQuantity}
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
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          <button className={ProductStyles.btnSubmit}>Add to Cart</button>
        </div>
      </div>
    </main>
  );
}

export default Product;
