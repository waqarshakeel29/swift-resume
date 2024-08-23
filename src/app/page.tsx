import Hero from "@/components/Hero";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles["home-container"]}>
      <Hero />
    </main>
  );
}
