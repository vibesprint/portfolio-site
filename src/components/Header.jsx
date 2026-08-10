import styles from "./Header.module.css";
import { Button } from "./Button.jsx";

export function Header({ showContacts }) {
  return (
    <div className={styles.header}>
      <p className={styles.header__logo}>mohammad.raza</p>
      <div className={styles["right-section"]}>
        <Button action={showContacts}>contact</Button>
        <div className={styles["right-section__indicator"]}>
          <p className={styles["right-section__indicator-dot"]}>*</p>
          <p className={styles["right-section__indicator-text"]}>
            open for work
          </p>
        </div>
      </div>
    </div>
  );
}
