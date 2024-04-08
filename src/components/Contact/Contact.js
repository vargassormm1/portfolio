import styles from "./Contact.module.css";
import IconGitHub from "@/Icons/github";
import IconLinkedin from "@/Icons/linkedIn";
import IconInstagram from "@/Icons/instagram";

const Contact = () => {
  return (
    <div id="contact" className={styles.container}>
      <div className={styles.sectionHeading}>
        <h2>Let&apos;s Connect</h2>
        <hr className={styles.divider} />
      </div>
      <div className={styles.contactContent}>
        <p>
          I&apos;m currently on the lookout for new opportunities and
          challenges. My inbox is always open for potential projects or
          collaborations. Whether you want to discuss a job offer, have a
          question, or just wish to say hello, feel free to reach out. I&apos;ll
          make sure to get back to you!
        </p>
        <a href={`mailto:ralphvargassorm@gmail.com`} className={styles.contact}>
          Say Hello
        </a>
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
    </div>
  );
};
export default Contact;
