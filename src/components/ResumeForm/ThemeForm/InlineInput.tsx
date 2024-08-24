import cx from "classnames";
import styles from "./styles.module.scss";

interface InputProps<K extends string, V extends string> {
  label: string;
  labelClassName?: string;
  name: K;
  value?: V;
  placeholder: string;
  inputStyle?: React.CSSProperties;
  onChange: (name: K, value: V) => void;
}

export const InlineInput = <K extends string>({
  label,
  labelClassName,
  name,
  value = "",
  placeholder,
  inputStyle = {},
  onChange,
}: InputProps<K, string>) => {
  return (
    <label className={cx(styles["inline-input-container"], labelClassName)}>
      <span className={styles["inline-input-container__label"]}>{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={styles["inline-input-container__input"]}
        style={inputStyle}
      />
    </label>
  );
};
