import styles from "./DotsIndicator.module.css";

export function DotsIndicator({ text, additionalTextStyle }) {
  const text_style = [styles.indicator, ...(additionalTextStyle ?? [])];
  return <p className={text_style.join(" ")}>{text}</p>;
}
