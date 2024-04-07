import styles from "./Socials.module.css";
import IconGitHub from "@/Icons/github";
import IconLinkedin from "@/Icons/linkedIn";
import IconInstagram from "@/Icons/instagram";

const Socials = () => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Socials;
