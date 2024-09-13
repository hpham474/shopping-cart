import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.topNav}>
        <h1 className={styles.logo}>Shopping Site</h1>
        <NavLink
          to="cart"
          className={({ isActive, isPending }) =>
            isActive
              ? styles.cartLinkActive
              : isPending
              ? styles.cartLinkPending
              : styles.cartLink
          }
        >
          Shopping Cart
        </NavLink>
      </div>
      <div className={styles.bottomNav}>
        <NavLink
          to=""
          className={({ isActive, isPending }) =>
            isActive
              ? styles.categoryLinksActive
              : isPending
              ? styles.categoryLinksPending
              : styles.categoryLinks
          }
        >
          Home
        </NavLink>
        <NavLink
          to="mens"
          className={({ isActive, isPending }) =>
            isActive
              ? styles.categoryLinksActive
              : isPending
              ? styles.categoryLinksPending
              : styles.categoryLinks
          }
        >
          Men&apos;s Clothing
        </NavLink>
        <NavLink
          to="womens"
          className={({ isActive, isPending }) =>
            isActive
              ? styles.categoryLinksActive
              : isPending
              ? styles.categoryLinksPending
              : styles.categoryLinks
          }
        >
          Women&apos;s Clothing
        </NavLink>
        <NavLink
          to="jewelery"
          className={({ isActive, isPending }) =>
            isActive
              ? styles.categoryLinksActive
              : isPending
              ? styles.categoryLinksPending
              : styles.categoryLinks
          }
        >
          Jewelery
        </NavLink>
        <NavLink
          to="electronics"
          className={({ isActive, isPending }) =>
            isActive
              ? styles.categoryLinksActive
              : isPending
              ? styles.categoryLinksPending
              : styles.categoryLinks
          }
        >
          Electronics
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
