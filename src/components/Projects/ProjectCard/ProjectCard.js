import styles from "./ProjectCard.module.css";
import Image from "next/image";

const ProjectCard = ({ image, external, github, title, desc }) => {
  return (
    <div className={styles.container}>
      <div className={styles.projectHeader}>
        <Image
          src={image}
          width={300}
          height={300}
          alt={title}
          className={styles.projectImage}
        />
      </div>
      <div className={styles.cardBody}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className={styles.projectLinks}>
          <a href={github}>Code</a>
          <a href={external}>Live</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
