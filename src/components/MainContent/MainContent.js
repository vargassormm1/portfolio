import styles from "./MainContent.module.css";
import IconGitHub from "@/Icons/github";
import IconLinkedin from "@/Icons/linkedIn";

const MainContent = () => {
  return (
    <div id="home" className={styles.mainSection}>
      <div className={styles.mainContent}>
        <h1>Hello I&apos;m</h1>
        <h2>Ralph Sormillon.</h2>
        <h3>I build websites and web apps</h3>
        <p>
          I am a software developer based in New Jersey. Building smooth,
          responsive websites and web apps.
        </p>
        <div className={styles.links}>
          <a
            href={`mailto:ralphvargassorm@gmail.com`}
            className={styles.contact}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
