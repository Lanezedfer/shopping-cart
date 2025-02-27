import { Link } from "react-router-dom";
import DefaultStyles from "../../css/default.module.css";

function Home() {
  return (
    <main>
      <div className={DefaultStyles.app}>
        <h1 className={DefaultStyles.title}>404 - Page Not Found</h1>
        <p className={DefaultStyles.description}>
          The page you are looking for does not exist.
        </p>
        <Link to="/" style={{ margin: "0 auto", textDecoration: "none" }}>
          <button className={DefaultStyles.btn}>Return to Home</button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
