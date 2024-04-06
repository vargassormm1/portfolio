import styles from "./Contact.module.css";

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
        <a href="" className={styles.contact}>
          Say Hello
        </a>
      </div>
    </div>
  );
};
export default Contact;
