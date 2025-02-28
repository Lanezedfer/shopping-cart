import PropTypes from "prop-types";
import SidebarStyles from "../../css/sidebar.module.css";

const Sidebar = ({ filters, handleFilterChange }) => {
  return (
    <aside className={SidebarStyles.sidebar}>
      <h1 className={SidebarStyles.title}>Categories</h1>
      <label className={SidebarStyles.label}>
        <div className={SidebarStyles.container}>
          <input
            type="checkbox"
            className={SidebarStyles.checkbox}
            checked={filters.mensClothing}
            onChange={() => handleFilterChange("mensClothing")}
          />
          <span className={SidebarStyles.span}></span>
        </div>
        Men&#8217;s Clothing
      </label>
      <label className={SidebarStyles.label}>
        <div className={SidebarStyles.container}>
          <input
            type="checkbox"
            className={SidebarStyles.checkbox}
            checked={filters.jewelry}
            onChange={() => handleFilterChange("jewelry")}
          />
          <span className={SidebarStyles.span}></span>
        </div>
        Jewelry
      </label>
      <label className={SidebarStyles.label}>
        <div className={SidebarStyles.container}>
          <input
            type="checkbox"
            className={SidebarStyles.checkbox}
            checked={filters.electronics}
            onChange={() => handleFilterChange("electronics")}
          />
          <span className={SidebarStyles.span}></span>
        </div>
        Electronics
      </label>
      <label className={SidebarStyles.label}>
        <div className={SidebarStyles.container}>
          <input
            type="checkbox"
            className={SidebarStyles.checkbox}
            checked={filters.womensClothing}
            onChange={() => handleFilterChange("womensClothing")}
          />
          <span className={SidebarStyles.span}></span>
        </div>
        Women&#8217;s Clothing
      </label>
    </aside>
  );
};

Sidebar.propTypes = {
  filters: PropTypes.shape({
    mensClothing: PropTypes.bool,
    jewelry: PropTypes.bool,
    electronics: PropTypes.bool,
    womensClothing: PropTypes.bool,
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Sidebar;
