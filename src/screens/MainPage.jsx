import styles from "./MainPage.module.css";
import { Header } from "../components/Header";
import { useHeroData } from "../lib/hero-section";
import { WorksListsForId } from "../fragments/works-lists";
import { getFAQData } from "../lib/faq";
import { FAQQuestion } from "../components/FAQQuestion";
import { CardDialog } from "../components/CardDialog.jsx";
import { useContactsList } from "../lib/contacts.js";
import { useRef, forwardRef } from "react";
import { DotsIndicator } from "../components/DotsIndicator.jsx";
import { ErrorText, NeutralText } from "../components/TextMessageUtils.jsx";

export function MainPage() {
  const contactsDialog = useRef(null);

  const showContacts = () => {
    console.log("time to show contacts");
    contactsDialog.current?.showModal();
  };

  return (
    <div className={styles.container}>
      <ContactsDialog ref={contactsDialog} />
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
  const { data, isPending, isError } = useHeroData();

  if (isError) return <ErrorText text="Error loading hero content" />;

  if (isPending) return <DotsIndicator text="Loading hero section" />;

  const { title, body } = data.data;

  if (title == null || body == null)
    return (
      <NeutralText text="No hero section content found! This should not happen please report to administrator" />
    );

  return (
    <div className={styles["hero-section"]}>
      <h1 className={styles["hero-section__title"]}>{title}</h1>
      <p className={styles["hero-section__body"]}>{body}</p>
    </div>
  );
}

function RecentWorks() {
  const loading_state = <DotsIndicator text="Loading the recent works" />;
  const empty_state = (
    <h1 className="font-body-primary text-grey-500">
      No entries found for recent works!
    </h1>
  );
  const err_state = (
    <h1 className="font-body-primary text-raspberry-800">
      Error: unable to load entries for recent works
    </h1>
  );
  const lists = (
    <WorksListsForId
      workslists_id="recent_works"
      loading_state={loading_state}
      empty_state={empty_state}
      err_state={err_state}
    />
  );

  return (
    <div className={styles["works"]}>
      <h1 className={styles["works__heading"]}>Recent Works</h1>
      <div className={styles["works__projects-lists"]}>{lists}</div>
    </div>
  );
}

function DistantWorks() {
  const loading_state = <DotsIndicator text="Loading the distant works" />;
  const empty_state = (
    <NeutralText text="No entries found for distant works!" />
  );
  const err_state = (
    <ErrorText text="Error: unable to load entries for distant works" />
  );

  const lists = (
    <WorksListsForId
      workslists_id="distant_works"
      loading_state={loading_state}
      empty_state={empty_state}
      err_state={err_state}
    />
  );

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
            return <FAQQuestion {...faq} key={index} name="faq" open={true} />;
          else return <FAQQuestion {...faq} key={index} name="faq" />;
        })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className={styles["footer"]}>
      <p className={styles["footer__copyright"]}>&copy; 2026 Mohammad Raza</p>
      <a
        href="https://github.com/vibesprint"
        className={styles["footer__github"]}
      >
        github
      </a>
    </div>
  );
}

const ContactsDialog = forwardRef((_props, ref) => {
  const { data, isPending, isError } = useContactsList();

  let content;
  if (isPending) {
    content = <DotsIndicator text="Loading contacts" />;
  } else if (isError) {
    content = <ErrorText text="Error: unable to load any contacts entries" />;
  } else if ((data?.length ?? 0) === 0) {
    content = <NeutralText text="No contacts entries found" />;
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
