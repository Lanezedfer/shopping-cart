import { Link } from "react-router-dom";
import DefaultStyles from "../../css/default.module.css";

function Home() {
  return (
    <main>
      <div className={DefaultStyles.app}>
        <h1 className={DefaultStyles.title}>Welcome to Shopping Cart</h1>
        <p className={DefaultStyles.description}>
          This is a fake web store app.
        </p>
        <Link to="/store" style={{ margin: "0 auto", textDecoration: "none" }}>
          <button className={DefaultStyles.btn}>Shop now</button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
