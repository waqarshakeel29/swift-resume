import { AutoTypingResume } from "@/components/AutoTypingResume";
import Link from 'next/link'
import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <div className={styles["hero-container"]}>
      <div className={styles["title-container"]}>
        <span className={styles["heading"]}>Your Dream Job Awaits</span>
        <span className={styles["subheading"]}>
          Create a standout resume in minutes with our intuitive builder. It&apos;s
          free, powerful, and designed to help you land your dream job.
        </span>
        <Link href="/resume-builder"><button className={styles['create-button']}>Create Resume</button></Link>
      </div>
      <AutoTypingResume />
    </div>
  );
}
