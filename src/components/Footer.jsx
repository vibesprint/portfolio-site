import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div className={styles["footer"]}>
      <p className={styles["footer__copyright"]}>&copy; 2026 Mohammad Raza</p>
      <a
        href="https://github.com/vibesprint"
        className={styles["footer__github"]}
      >
        github
      </a>
    </div>
  );
}
