import styles from "./App.module.css";
import { MainPage } from "./screens/MainPage";

export default function App() {
  return (
    <div className={styles.body}>
      <MainPage />
    </div>
  );
}
