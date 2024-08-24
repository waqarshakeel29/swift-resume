"use client";
import { useState } from "react";
import cx from "classnames";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "@/app/lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "@/app/lib/redux/settingsSlice";
import { ProfileForm } from "@/components/ResumeForm/ProfileForm/ProfileForm";
import { WorkExperiencesForm } from "@/components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "@/components/ResumeForm/EducationsForm";
import { ProjectsForm } from "@/components/ResumeForm/ProjectsForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm/SkillsForm";
import { ThemeForm } from "@/components/ResumeForm/ThemeForm";
import { CustomForm } from "@/components/ResumeForm/CustomForm/CustomForm";
import { FlexboxSpacer } from "@/components/FlexboxSpacer";
import styles from "./styles.module.scss";

const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={cx(styles.container, {
        [styles["custom-scrollbar"]]: isHover,
      })}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <section className={styles["section-container"]}>
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
        <ThemeForm />
        <br />
      </section>
      <FlexboxSpacer maxWidth={50} className={styles["custom-visibility"]} />
    </div>
  );
};
