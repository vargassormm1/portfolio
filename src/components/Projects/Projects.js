import styles from "./Projects.module.css";
import projects from "@/config/projects";
import ProjectCard from "./ProjectCard/ProjectCard";
const Projects = () => {
  return (
    <div id="projects" className={styles.container}>
      <div className={styles.sectionHeading}>
        <h2>Some Projects I&apos;ve Built</h2>
        <hr className={styles.divider} />
      </div>
      <div className={styles.projectsContent}>
        {projects.map((proj) => {
          return (
            <ProjectCard
              key={proj.title}
              image={proj.image}
              external={proj.external}
              github={proj.github}
              title={proj.title}
              desc={proj.desc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
