import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h1>
        <a href="/#home">Ralph</a>
      </h1>
      <ul className={styles.navLinks}>
        <li>
          <a href="/#home">Home</a>
        </li>
        <li>
          <a href="/#about">About</a>
        </li>
        <li>
          <a href="/#projects">Projects</a>
        </li>
        <li>
          <a href="/#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
