import styles from "./ExperiencePage.module.css";
import { Header } from "../components/Header";
import { useExperience } from "../lib/experience";
import { DotsIndicator } from "../components/DotsIndicator";
import { ErrorText, NeutralText } from "../components/TextMessageUtils";

export default function ExperiencePage() {
  const { data: experience, isPending, isError } = useExperience();
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.content__heading}>Experience</h1>

        {isPending ? (
          <DotsIndicator text="Loading" />
        ) : isError ? (
          <ErrorText text="Error: unable to load experience details" />
        ) : experience == null ? (
          <NeutralText text="No entry for experience found" />
        ) : (
          <p className={styles.content__body}>{experience}</p>
        )}
      </div>
    </div>
  );
}
