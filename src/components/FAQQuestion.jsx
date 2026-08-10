import styles from "./FAQQuestion.module.css";

export function FAQQuestion({ question, answer, ...attrs }) {
  return (
    <details className={styles["faq"]} {...attrs}>
      <summary className={styles["faq__question"]}>{question}</summary>
      <p className={styles["faq__answer"]}>{answer}</p>
    </details>
  );
}
