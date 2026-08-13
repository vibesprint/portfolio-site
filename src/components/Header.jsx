import styles from "./Header.module.css";
import { Button } from "./Button.jsx";
import { useCurrentStatus } from "../lib/current-status.js";
import { DotsIndicator } from "./DotsIndicator.jsx";

export function Header({ showContacts }) {
  const { data: current_status, isPending, isError } = useCurrentStatus();
  let indicator_bg = null;
  if (current_status) {
    indicator_bg =
      current_status === "closed"
        ? "var(--color-grey-100)"
        : current_status === "in-talks"
          ? "var(--color-gold-200)"
          : null;
  }

  return (
    <div className={styles.header}>
      <p className={styles.header__logo}>mohammad.raza</p>
      <div className={styles["right-section"]}>
        <Button action={showContacts}>contact</Button>
        <div
          className={styles["right-section__indicator"]}
          style={indicator_bg ? { backgroundColor: indicator_bg } : undefined}
        >
          <p className={styles["right-section__indicator-dot"]}>*</p>

          <p
            className={styles["right-section__indicator-text"]}
            style={
              current_status === "closed"
                ? { color: "var(--color-grey-600)" }
                : undefined
            }
          >
            {isPending || isError
              ? "open for work"
              : current_status === "in-talks"
                ? "in talks for hire"
                : current_status === "closed"
                  ? "closed for hire"
                  : "open for work"}
          </p>
        </div>
      </div>
    </div>
  );
}
