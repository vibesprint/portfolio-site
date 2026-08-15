import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles["footer"]}>
      <p className={styles["footer__copyright"]}>&copy; 2026 Mohammad Raza</p>
      <a
        href="https://github.com/vibesprint"
        className={styles["footer__github"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
    </footer>
  );
}
