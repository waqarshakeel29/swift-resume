import Image from "next/image";
import Link from "next/link";
// import logoSrc from "/public/logo.svg";
import styles from "./styles.module.css";

export default function TopNavBar() {
  return (
    <div className={styles.container}>
      <span className={styles["first-label"]}>Swift</span>{" "}
      <span className={styles["second-label"]}>Resume</span>
      {/* <Image
          src={logoSrc}
          alt="SwiftSolutions Logo"
          priority
        /> */}
    </div>
  );
}
