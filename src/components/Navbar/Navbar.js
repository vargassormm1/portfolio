import styles from "./Navbar.module.css";
import NavMobile from "./NavMobile/NavMobile";
import NavLinks from "./NavLinks/NavLinks";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/#home" className={styles.logo}>
        <h1>Ralph</h1>
      </Link>
      <NavLinks />
      <NavMobile />
    </div>
  );
};

export default Navbar;
