import cx from "classnames";
import { ExpanderWithHeightTransition } from "@/components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "@/components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
  ShowForm,
} from "@/app/lib/redux/settingsSlice";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  LightBulbIcon,
  WrenchIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "@/app/lib/redux/resumeSlice";
import styles from "./styles.module.scss";

/**
 * BaseForm is the bare bone form, i.e. just the outline with no title and no control buttons.
 * ProfileForm uses this to compose its outline.
 */
export const BaseForm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cx(styles[`base-form`], className)}>{children}</section>
);

const FORM_TO_ICON: { [section in ShowForm]: typeof BuildingOfficeIcon } = {
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
};

export const Form = ({
  form,
  addButtonText,
  children,
}: {
  form: ShowForm;
  addButtonText?: string;
  children: React.ReactNode;
}) => {
  const showForm = useAppSelector(selectShowByForm(form));
  const heading = useAppSelector(selectHeadingByForm(form));

  const dispatch = useAppDispatch();
  const setShowForm = (showForm: boolean) => {
    dispatch(changeShowForm({ field: form, value: showForm }));
  };
  const setHeading = (heading: string) => {
    dispatch(changeFormHeading({ field: form, value: heading }));
  };

  const isFirstForm = useAppSelector(selectIsFirstForm(form));
  const isLastForm = useAppSelector(selectIsLastForm(form));

  const handleMoveClick = (type: "up" | "down") => {
    dispatch(changeFormOrder({ form, type }));
  };

  const Icon = FORM_TO_ICON[form];

  return (
    <BaseForm
      className={cx(styles["transition-opacity"], {
        [styles["show-form"]]: showForm,
        [styles["show-form"]]: !showForm,
      })}
    >
      <div className={styles["form-container"]}>
        <div className={styles["form-icon-container"]}>
          <Icon
            className={styles["form-icon-container__icon"]}
            aria-hidden="true"
          />
          <input
            type="text"
            className={styles["form-icon-container__input"]}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className={styles["move-icon-container"]}>
          {!isFirstForm && (
            <MoveIconButton type="up" onClick={handleMoveClick} />
          )}
          {!isLastForm && (
            <MoveIconButton type="down" onClick={handleMoveClick} />
          )}
          <ShowIconButton show={showForm} setShow={setShowForm} />
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        {children}
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && (
        <div className={styles["form-button-container"]}>
          <button
            type="button"
            onClick={() => {
              dispatch(addSectionInForm({ form }));
            }}
            className={styles["form-button-container__button"]}
          >
            <PlusSmallIcon
              className={styles["form-button-container__icon"]}
              aria-hidden="true"
            />
            {addButtonText}
          </button>
        </div>
      )}
    </BaseForm>
  );
};

export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}: {
  form: ShowForm;
  idx: number;
  showMoveUp: boolean;
  showMoveDown: boolean;
  showDelete: boolean;
  deleteButtonTooltipText: string;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }));
  };
  const handleMoveClick = (direction: "up" | "down") => {
    dispatch(moveSectionInForm({ form, direction, idx }));
  };

  return (
    <>
      {idx !== 0 && <div className={styles["form-section__custom-border"]} />}
      <div className={styles["form-section__custom-grid"]}>
        {children}
        <div className={styles["form-section__custom-positioned-flex"]}>
          <div
            className={cx(styles["form-section__icon"], {
              [styles["form-section__icon-hidden"]]: !showMoveUp,
              [styles["form-section__icon-margin"]]: !showMoveDown,
            })}
          >
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </div>
          <div
            className={cx(styles["form-section__icon"], {
              [styles["form-section__icon-hidden"]]: !showMoveDown,
            })}
          >
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </div>
          <div
            className={cx(styles["form-section__icon"], {
              [styles["form-section__icon-hidden"]]: !showDelete,
            })}
          >
            <DeleteIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
