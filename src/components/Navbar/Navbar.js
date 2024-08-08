import styles from "./Navbar.module.css";
import IconGitHub from "@/Icons/github";
import IconLinkedin from "@/Icons/linkedIn";
import IconInstagram from "@/Icons/instagram";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h1>
        <a href="/#home">Ralph</a>
      </h1>
      <div>
        <ul className={styles.socials}>
          <li>
            <a
              href="https://www.linkedin.com/in/ralph-vargas-sormillon/"
              target="_blank"
              className={styles.icon}
            >
              <IconLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/vargassormm1"
              target="_blank"
              className={styles.icon}
            >
              <IconGitHub />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/ralphvargas_/"
              target="_blank"
              className={styles.icon}
            >
              <IconInstagram />
            </a>
          </li>
        </ul>
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
    </div>
  );
};

export default Navbar;
