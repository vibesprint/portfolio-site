import styles from "./Header.module.css";
import { Button } from "./Button.jsx";
import { useCurrentStatus } from "../lib/current-status.js";
import { useRef } from "react";

export function Header() {
  const { data: current_status, isPending, isError } = useCurrentStatus();
  const contact_dialog = useRef(null);
  let indicator_bg = null;
  if (current_status) {
    indicator_bg =
      current_status === "closed"
        ? "var(--color-grey-100)"
        : current_status === "in-talks"
          ? "var(--color-gold-200)"
          : null;
  }

  function showContacts() {
    contact_dialog.current?.showModal();
  }

  return (
    <header className={styles.header}>
      <a href="/" className={styles.header__logo} aria-label="Go to main page">
        <p aria-hidden="true">mohammad.raza</p>
      </a>
      <div className={styles["right-section"]}>
        <a href="/exp" className={styles["right-section__experience"]}>
          <p>experience</p>
        </a>
        <Button action={showContacts} data-umami-event="show-contacts">
          contact
        </Button>
        <div
          className={styles["right-section__indicator"]}
          style={indicator_bg ? { backgroundColor: indicator_bg } : undefined}
        >
          <p
            className={styles["right-section__indicator-dot"]}
            aria-hidden="true"
          >
            *
          </p>

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
      <ContactsDialog ref={contact_dialog} />
    </header>
  );
}

import { forwardRef } from "react";
import { useContactsList } from "../lib/contacts.js";
import { DotsIndicator } from "./DotsIndicator.jsx";
import { NeutralText, ErrorText } from "./TextMessageUtils.jsx";
import { CardDialog } from "./CardDialog.jsx";

const ContactsDialog = forwardRef((_props, ref) => {
  const { data, isPending, isError } = useContactsList();

  let content;
  if (isPending) {
    content = (
      <DotsIndicator
        text="Loading contacts"
        additionalTextStyle={["max-sm:font-body-secondary"]}
      />
    );
  } else if (isError) {
    content = (
      <ErrorText
        text="Error: unable to load any contacts entries"
        additionalTextStyle={["max-sm:font-body-secondary"]}
      />
    );
  } else if ((data?.length ?? 0) === 0) {
    content = (
      <NeutralText
        text="No contacts entries found"
        additionalTextStyle={["max-sm:font-body-secondary"]}
      />
    );
  } else {
    content = (
      <ul className={styles["contact-card"]}>
        {data.map((contact) => {
          return <li key={contact}>{contact}</li>;
        })}
      </ul>
    );
  }

  return <CardDialog ref={ref} content={content} title="Contacts" />;
});
