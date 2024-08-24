import { Form } from "@/components/ResumeForm/Form";
import {
  BulletListTextarea,
  InputGroupWrapper,
} from "@/components/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "@/components/ResumeForm/Form/FeaturedSkillInput";
import { BulletListIconButton } from "@/components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { selectSkills, changeSkills } from "@/app/lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
  selectThemeColor,
} from "@/app/lib/redux/settingsSlice";
import styles from './styles.module.scss';

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const { featuredSkills, descriptions } = skills;
  const form = "skills";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      <div className={styles['container']}>
        <div className={styles['bullet-point-container']}>
          <BulletListTextarea
            label="Skills List"
            labelClassName={styles['full-column-span']}
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleSkillsChange}
            showBulletPoints={showBulletPoints}
          />
          <div className={styles['bullet-visibility-button']}>
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
        <div className={styles['dotted-divider']} />
        <InputGroupWrapper
          label="Featured Skills (Optional)"
          className={styles['full-column-span']}
        >
          <p className={styles['skill-info']}>
            Featured skills is optional to highlight top skills, with more
            circles mean higher proficiency.
          </p>
        </InputGroupWrapper>

        {featuredSkills.map(({ skill, rating }, idx) => (
          <FeaturedSkillInput
            key={idx}
            className={styles['half-column-span']}
            skill={skill}
            rating={rating}
            setSkillRating={(newSkill, newRating) => {
              handleFeaturedSkillsChange(idx, newSkill, newRating);
            }}
            placeholder={`Featured Skill ${idx + 1}`}
            circleColor={themeColor}
          />
        ))}
      </div>
    </Form>
  );
};
