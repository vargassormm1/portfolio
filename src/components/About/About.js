import styles from "./About.module.css";
import Image from "next/image";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeading}>
        <h2>About Me</h2>
        <hr className={styles.divider} />
      </div>
      <div className={styles.aboutContent}>
        <div className={styles.aboutMe}>
          <div>
            <p>
              Hello! I&apos;m Ralph, a Software Developer from New Jersey, USA.
            </p>
            <p>
              I&apos;m passionate about designing smooth, responsive web and
              mobile experiences.
              <br />
              My mission is to develop scalable and efficient software
              solutions.
            </p>
            <br />
            <p>Here are some tools I&apos;ve been using lately:</p>
          </div>
          <ul className={styles.skillsList}>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>NextJS</li>
            <li>React</li>
            <li>PostgreSQL</li>
            <li>NodeJS</li>
          </ul>
        </div>
        <div>
          <Image
            src="/profile.jpeg"
            width={300}
            height={300}
            alt="Profile Picture"
            className={styles.profileImage}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
