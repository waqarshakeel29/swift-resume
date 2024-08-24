"use client";
import { Provider } from "react-redux";
import { store } from "@/app/lib/redux/store";
import { ResumeForm } from "@/components/ResumeForm";
import { Resume } from "@/components/Resume";
import styles from './styles.module.scss';

export default function Create() {
  return (
    <Provider store={store}>
      <main className={styles.container}>
        <div className={styles['resume-container']}>
          <div className={styles.item}>
            <ResumeForm />
          </div>
          <div className={styles.item}>
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
