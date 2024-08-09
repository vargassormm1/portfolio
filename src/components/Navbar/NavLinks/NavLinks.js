import Link from "next/link";
import styles from "./NavLinks.module.css";
import { routes } from "@/config/navroutes";

const NavLinks = () => {
  return (
    <div className={styles.container}>
      {routes.map((route) => {
        return (
          <Link key={route.name} href={route.path} className={styles.link}>
            {route.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
