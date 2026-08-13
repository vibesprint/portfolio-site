import styles from "./ProjectCard.module.css";

export function ProjectCard({ title, desc, src_site, live_site, img_url }) {
  return (
    <article className={styles.card}>
      <img src={img_url} alt={title} className={styles["card__image"]} />
      <div className={styles["card__texts"]}>
        <h2 className={styles["card__heading"]}>{title}</h2>
        <div className={styles["card__links"]}>
          <a href={live_site} className={styles["cards__live-site-link"]}>
            Visit Site
          </a>
          <a href={src_site} className={styles["cards__src-site-link"]}>
            View Source Code
          </a>
        </div>
        <p className={styles["card__desc"]}>{desc}</p>
      </div>
    </article>
  );
}
