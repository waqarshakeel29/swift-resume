import { Form, FormSection } from "@/components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "@/components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "@/components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { selectProjects, changeProjects } from "@/app/lib/redux/resumeSlice";
import type { ResumeProject } from "@/app/lib/redux/types";
import styles from './styles.module.scss';

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;

  return (
    <Form form="projects" addButtonText="Add Project">
      {projects.map(({ project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete project"}
          >
            <Input
              name="project"
              label="Project Name"
              placeholder="OpenResume"
              value={project}
              onChange={handleProjectChange}
              labelClassName={styles['full-column-span']}
            />
            <Input
              name="date"
              label="Date"
              placeholder="Winter 2022"
              value={date}
              onChange={handleProjectChange}
              labelClassName={styles['full-column-span']}
            />
            <BulletListTextarea
              name="descriptions"
              label="Description"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName={styles['full-column-span']}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
