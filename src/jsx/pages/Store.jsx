import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar.jsx";
import StoreStyles from "../../css/store.module.css";
import ratingIcon from "../../assets/icons/rating-icon.svg";

function Store({ isSidebarVisible }) {
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          mensClothing: false,
          jewelry: false,
          electronics: false,
          womensClothing: false,
        };
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setFilters(savedFilters);
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch products. Please try again later.");
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const handleFilterChange = (filter) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const filteredProducts = products.filter((product) => {
    if (
      !filters.mensClothing &&
      !filters.jewelry &&
      !filters.electronics &&
      !filters.womensClothing
    ) {
      return products;
    }
    return (
      (filters.mensClothing && product.category === "men's clothing") ||
      (filters.jewelry && product.category === "jewelery") ||
      (filters.electronics && product.category === "electronics") ||
      (filters.womensClothing && product.category === "women's clothing")
    );
  });

  return (
    <main
      className={`${StoreStyles.store} ${!isSidebarVisible ? StoreStyles.storeSidebar : ""}`}
    >
      <div
        className={`${StoreStyles.sidebar} ${isSidebarVisible ? StoreStyles.sidebarVisible : ""}`}
      >
        <Sidebar filters={filters} handleFilterChange={handleFilterChange} />
      </div>
      <div
        className={`${StoreStyles.product} ${!isSidebarVisible ? StoreStyles.productSidebar : ""}`}
      >
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={StoreStyles.card}
            style={{ textDecoration: "none" }}
          >
            <img
              src={product.image}
              alt={`Image of ${product.title}`}
              className={StoreStyles.img}
            />
            <h2 className={StoreStyles.title}>{product.title}</h2>
            <div className={StoreStyles.container}>
              <p className={StoreStyles.price}>₱{product.price}</p>
              <div className={StoreStyles.rating}>
                <img
                  src={ratingIcon}
                  alt={`${product.title} rating`}
                  className={StoreStyles.icon}
                />
                <p className={StoreStyles.score}>
                  {product.rating.rate} ({product.rating.count})
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

Store.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
};

export default Store;
