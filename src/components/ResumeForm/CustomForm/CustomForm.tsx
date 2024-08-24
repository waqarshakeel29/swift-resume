import { Form } from "@/components/ResumeForm/Form";
import { BulletListIconButton } from "@/components/ResumeForm/Form/IconButton";
import { BulletListTextarea } from "@/components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeCustom, selectCustom } from "@/app/lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
} from "@/app/lib/redux/settingsSlice";
import styles from "./styles.module.scss";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      <div className={styles["container"]}>
        <div className={styles["bullet-container"]}>
          <BulletListTextarea
            label="Custom Textbox"
            labelClassName={styles["full-column-span"]}
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className={styles["bullet-visibility-button"]}>
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
