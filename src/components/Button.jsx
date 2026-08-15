import styles from "./Button.module.css";

export function Button({ children, action, ...args }) {
  return (
    <button className={styles.button} onClick={action} {...args}>
      {children}
    </button>
  );
}
