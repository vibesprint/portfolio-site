import styles from "./MainPage.module.css";
import { Header } from "../components/Header";
import { getHeroData } from "../lib/hero-section";
import { makeAllWorksListsForId } from "../fragments/works-lists";
import { getFAQData } from "../lib/faq";
import { FAQQuestion } from "../components/FAQQuestion";
import { CardDialog } from "../components/CardDialog.jsx";
import { getContactsList } from "../lib/contacts.js";
import { useRef } from "react";

export function MainPage() {
  const contactsDialog = useRef(null);

  const showContacts = () => {
    console.log("time to show contacts");
    contactsDialog.current?.showModal();
  };

  return (
    <div className={styles.container}>
      {makeContactsDialog(contactsDialog)}
      <Header showContacts={showContacts} />
      <HeroSection />
      <RecentWorks />
      <DistantWorks />
      <FAQSection />
      <Footer />
    </div>
  );
}

function HeroSection() {
  const {
    data: { title, body },
  } = getHeroData();

  return (
    <div className={styles["hero-section"]}>
      <h1 className={styles["hero-section__title"]}>{title}</h1>
      <p className={styles["hero-section__body"]}>{body}</p>
    </div>
  );
}

function RecentWorks() {
  const lists = makeAllWorksListsForId("recent_works");

  return (
    <div className={styles["works"]}>
      <h1 className={styles["works__heading"]}>Recent Works</h1>
      <div className={styles["works__projects-lists"]}>{lists}</div>
    </div>
  );
}

function DistantWorks() {
  const lists = makeAllWorksListsForId("distant_works");

  return (
    <div className={styles["works"]}>
      <h1 className={styles["works__heading"]}>Distant Works</h1>
      <div className={styles["works__projects-lists"]}>{lists}</div>
    </div>
  );
}

function FAQSection() {
  const { data } = getFAQData();
  return (
    <div className={styles["faq"]}>
      <h1 className={styles["faq__heading"]}>FAQs</h1>
      <div className={styles["faq__questions"]}>
        {data.map((faq, index) => {
          if (index === 0)
            return <FAQQuestion {...faq} key={index} name="faq" open="true" />;
          else return <FAQQuestion {...faq} key={index} name="faq" />;
        })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className={styles["footer"]}>
      <p className={styles["footer__copyright"]}>c 2026 Mohammad Raza</p>
      <a
        href="https://github.com/vibesprint"
        className={styles["footer__github"]}
      >
        github
      </a>
    </div>
  );
}

function makeContactsDialog(ref) {
  const { data } = getContactsList();

  const content = (
    <ul className={styles["contact-card"]}>
      {data.map((contact) => {
        return <li key={contact}>{contact}</li>;
      })}
    </ul>
  );

  return <CardDialog ref={ref} content={content} title="Contacts" />;
}
