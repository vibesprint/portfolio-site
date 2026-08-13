import styles from "./ProjectList.module.css";

export function ProjectList({ title, desc, cards, badge }) {
  return (
    <section className={styles["projlist"]}>
      <div className={styles["projlist__texts"]}>
        <div className={styles["projlist__heading-with-badge"]}>
          <h1 className={styles["projlist__heading"]}>{title}</h1>
          {badge && <p className={styles["projlist__badge"]}>{badge}</p>}
        </div>
        <p className={styles["projlist__desc"]}>{desc}</p>
      </div>

      <ul className={styles["projlist__cards"]}>
        {cards.map((card, index) => (
          <li key={index}>{card}</li>
        ))}
      </ul>
    </section>
  );
}
