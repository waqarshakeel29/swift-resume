import { AutoTypingResume } from "@/components/AutoTypingResume";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <div className={styles["hero-container"]}>
      <div className={styles["title-container"]}>
        <span className={styles["heading"]}>Your Dream Job Awaits</span>
        <span className={styles["subheading"]}>
          Create a standout resume in minutes with our intuitive builder. It's
          free, powerful, and designed to help you land your dream job.
        </span>
        <button className={styles['create-button']}>Create Resume</button>
      </div>
      <AutoTypingResume />
    </div>
  );
}
