import styles from "./Button.module.css";

export function Button({ children, action }) {
  return (
    <button className={styles.button} onClick={action}>
      {children}
    </button>
  );
}
