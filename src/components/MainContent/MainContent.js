import styles from "./MainContent.module.css";
import IconGitHub from "@/Icons/github";
import IconLinkedin from "@/Icons/linkedIn";

const MainContent = () => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.mainContent}>
        <h1>Hello I&apos;m</h1>
        <h2>Ralph Sormillon.</h2>
        <h2>I build websites and web apps</h2>
        <p>
          I am a software developer based in New Jersey. Building smooth,
          responsive websites and web apps.
        </p>
        <div className={styles.links}>
          <a href="" className={styles.contact}>
            Let&apos;s Talk
          </a>
          <a href="" className={styles.icon}>
            <IconGitHub />
          </a>
          <a href="" className={styles.icon}>
            <IconLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
