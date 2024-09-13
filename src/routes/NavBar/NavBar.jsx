import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.topNav}>
        <h1>Logo</h1>
        <NavLink to="cart">Shopping Cart</NavLink>
      </div>
      <div className={styles.bottomNav}>
        <NavLink to="">Home</NavLink>
        <NavLink to="mens">Men&apos;s Clothing</NavLink>
        <NavLink to="womens">Women&apos;s Clothing</NavLink>
        <NavLink to="jewelery">Jewelery</NavLink>
        <NavLink to="electronics">Electronics</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
