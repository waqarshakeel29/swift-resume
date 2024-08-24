import classNames from "classnames";
import styles from "./TextField.module.scss";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { Label } from "../Label/Label";

type Size = "small" | "medium";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: Size;
  label?: string;
  onChange?: (
    e: ChangeEvent,
    args: {
      id: TextFieldProps["id"];
      value: ChangeEvent<HTMLInputElement>["target"]["value"];
    }
  ) => void;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
};

/**
 * Primary UI component for user interaction
 */
export const TextField = ({
  id = "",
  size = "small",
  placeholder = "Text",
  disabled = false,
  invalid = false,
  label,
  className,
  onChange,
  ...props
}: TextFieldProps) => {
  const containerClass = classNames(styles["text-field"], className);
  const inputClass = classNames(styles["text-field__input"], {
    [styles[`text-field__input--${size}`]]: size,
    [styles[`text-field__input--invalid`]]: invalid,
    [styles[`text-field__input--disabled`]]: disabled,
  });

  return (
    <div className={containerClass}>
      {label && (
        <Label htmlFor={id} size={size}>
          {label}
        </Label>
      )}
      <input
        className={inputClass}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
