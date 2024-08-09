"use client";
import styles from "./NavMobile.module.css";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { routes } from "@/config/navroutes";
import IconGitHub from "@/Icons/github";
import IconLinkedin from "@/Icons/linkedIn";
import IconInstagram from "@/Icons/instagram";

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.hamburger}>
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
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      {isOpen && (
        <div className={styles.mobileNav}>
          <ul className={styles.navList}>
            {routes.map((route) => {
              return (
                <li key={route.name} className={styles.navItem}>
                  <a
                    onClick={() => setOpen((prev) => !prev)}
                    className={styles.navLink}
                    href={route.path}
                  >
                    <span className={styles.navText}>{route.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavMobile;
