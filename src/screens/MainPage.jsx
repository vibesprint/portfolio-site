import styles from "./MainPage.module.css";
import { Header } from "../components/Header";
import { useHeroData } from "../lib/hero-section";
import { WorksListsForId } from "../fragments/works-lists";
import { getFAQData } from "../lib/faq";
import { FAQQuestion } from "../components/FAQQuestion";
import { DotsIndicator } from "../components/DotsIndicator.jsx";
import { ErrorText, NeutralText } from "../components/TextMessageUtils.jsx";
import { Footer } from "../components/Footer.jsx";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles["container__main"]}>
        <HeroSection />
        <RecentWorks />
        <DistantWorks />
        <FAQSection />
      </main>
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
    <article className={styles["hero-section"]}>
      <div className={styles["hero-section__texts"]}>
        <h1 className={styles["hero-section__title"]}>{title}</h1>
        <p className={styles["hero-section__body"]}>{body}</p>
      </div>
      <a href="/exp" className={styles["hero-section__experience"]}>
        experience.html
      </a>
    </article>
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
    <article className={styles["works"]}>
      <h1 className={styles["works__heading"]}>Recent Works</h1>
      <div className={styles["works__projects-lists"]}>{lists}</div>
    </article>
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
    <article className={styles["works"]}>
      <h1 className={styles["works__heading"]}>Distant Works</h1>
      <div className={styles["works__projects-lists"]}>{lists}</div>
    </article>
  );
}

function FAQSection() {
  const { data } = getFAQData();
  return (
    <article className={styles["faq"]}>
      <h1 className={styles["faq__heading"]}>FAQs</h1>
      <ul className={styles["faq__questions"]}>
        {data.map((faq, index) => {
          if (index === 0)
            return (
              <li key={index}>
                <FAQQuestion {...faq} name="faq" open={true} />
              </li>
            );
          else
            return (
              <li key={index}>
                <FAQQuestion {...faq} name="faq" />
              </li>
            );
        })}
      </ul>
    </article>
  );
}
