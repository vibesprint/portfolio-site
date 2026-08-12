import styles from "./DotsIndicator.module.css";

export function DotsIndicator({ text }) {
  return <p className={styles.indicator}>{text}</p>;
}
