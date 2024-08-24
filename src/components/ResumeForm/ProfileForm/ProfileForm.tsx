import { BaseForm } from "@/components/ResumeForm/Form";
import { Input, Textarea } from "@/components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { changeProfile, selectProfile } from "@/app/lib/redux/resumeSlice";
import { ResumeProfile } from "@/app/lib/redux/types";
import styles from './styles.module.scss';

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className={styles['profile-form__container']}>
        <Input
          label="Name"
          labelClassName={styles['full-column-span']}
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName={styles['full-column-span']}
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName={styles['half-column-span']}
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName={styles['half-column-span']}
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName={styles['half-column-span']}
          name="url"
          placeholder="linkedin.com/in/khanacademy"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName={styles['half-column-span']}
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
